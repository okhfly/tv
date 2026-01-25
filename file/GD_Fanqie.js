const $config = argsify($config_str)
const UA = 'UC_UA'
const headers = {
    'User-Agent': UA,
}

const API_HOST = 'https://qfqapi.vv9v.cn'

// Simplified categories based on the original script
const CATEGORIES = [
    { name: '精品小说', type: '970' },
    { name: '悬疑灵异', type: '10' },
    { name: '都市爽文', type: '1' },
    { name: '言情', type: '3' },
    { name: '历史', type: '37' },
    { name: '武侠', type: '27' },
    { name: '相声评书', type: '111' }
]

const appConfig = {
    ver: 1,
    name: '番茄畅听',
    message: '基于番茄畅听API',
    warning: '仅供学习交流',
    desc: '番茄畅听 - GD版',
    tabLibrary: {
        name: '推荐',
        groups: CATEGORIES.map(cat => ({
            name: cat.name,
            type: 'song',
            ui: 0,
            showMore: true,
            ext: {
                gid: cat.type,
                source: 'fanqie',
                // Using gid to pass the category ID
            }
        })),
    },
    tabSearch: {
        name: '搜索',
        groups: [
            {
                name: '番茄畅听',
                type: 'song',
                ext: {
                    type: 'song',
                    source: 'fanqie'
                }
            }
        ]
    }
}

async function getConfig() {
    return jsonify(appConfig)
}

// Helper to standard request
async function request(url) {
    try {
        const { data } = await $fetch.get(url, { headers })
        // Sometimes data is already an object, sometimes a string
        if (typeof data === 'string') {
            // Clean potential BOM or whitespace
            try {
                return JSON.parse(data.trim())
            } catch (e) {
                return null
            }
        }
        return data
    } catch (e) {
        return null
    }
}

// Map Fanqie Book to GD Song
function mapBookToSong(book) {
    if (!book) return null;
    return {
        id: `fanqie_${book.book_id || book.BookId}`,
        name: book.book_name || book.BookName || '未知书名',
        cover: book.thumb_url || book.ThumbURL || book.audio_thumb_uri || 'https://www.18zf.net/d/file/p/2023/1107/3ty5orktxrc.jpg',
        duration: 0,
        artist: {
            id: 'unknown',
            name: book.author || book.Author || '未知作者'
        },
        ext: {
            track_id: book.book_id || book.BookId,
            source: 'fanqie'
        }
    }
}

async function searchSource(text, source, page = 1, count = 10) {
    // Fanqie's search API logic
    // url: '/api/search?key=**&tab_type=2&offset=((fypage-1)*10)'

    // Note: The original script uses page-1 * 10 for offset. 
    const offset = (page - 1) * 10
    const url = `${API_HOST}/api/search?key=${encodeURIComponent(text)}&tab_type=2&offset=${offset}`

    const json = await request(url)
    const songs = []

    if (json && json.data && json.data.search_tabs) {
        // Tab index 4 usually contains the book list in original script logic
        // The original script accesses `search_tabs[4]`. Let's try to find the one with `book_data`
        const tabs = json.data.search_tabs;
        let books = [];
        for (let tab of tabs) {
            if (tab.data && tab.data.length > 0 && tab.data[0].book_data) {
                books = tab.data;
                break;
            }
        }

        // Fallback or specific index if we want to stick to original
        if (books.length === 0 && tabs[4] && tabs[4].data) {
            books = tabs[4].data;
        }

        for (let it of books) {
            if (it.book_data && it.book_data.length > 0) {
                const book = it.book_data[0]
                const song = mapBookToSong(book)
                if (song) songs.push(song)
            }
        }
    }

    return songs
}

async function getSongs(ext) {
    const { page = 1, gid, text, source = 'fanqie' } = argsify(ext)

    // logic from original '一级': 
    // url: '/api/discover?tab=听书&type=fyclass&gender=2&genre_type=1&page={{page}}'

    const categoryId = gid || '970' // Default to '精品小说' if missing
    const url = `${API_HOST}/api/discover?tab=${encodeURIComponent('听书')}&type=${categoryId}&gender=2&genre_type=1&page=${page}`

    const json = await request(url)
    const songs = []

    if (json && json.code === 200 && json.data) {
        for (let book of json.data) {
            const song = mapBookToSong(book)
            if (song) songs.push(song)
        }
    }

    return jsonify({
        list: songs,
    })
}


async function search(ext) {
    const { text, page = 1, source } = argsify(ext)

    if (!text) {
        return jsonify({ list: [] })
    }

    const songs = await searchSource(text, source, page)

    return jsonify({
        list: songs,
    })
}

// Get Play info. 
// For Fanqie, 'Song' is a Book. We need to get chapters and play the first one.
async function getSongInfo(ext) {
    const { track_id, source } = argsify(ext)

    if (!track_id) {
        return jsonify({ urls: [] })
    }

    try {
        // 1. Get Chapters
        // Original logic: `/api/book?book_id=${id}`
        const chaptersUrl = `${API_HOST}/api/book?book_id=${track_id}`
        const chaptersJson = await request(chaptersUrl)

        let firstChapterId = null;

        if (chaptersJson && chaptersJson.data && chaptersJson.data.data) {
            const bookData = chaptersJson.data.data;
            // Try to find the list
            const list = (bookData.chapterListWithVolume && bookData.chapterListWithVolume.flat()) || bookData.chapterList || [];
            if (list.length > 0) {
                firstChapterId = list[0].itemId;
            }
        }

        if (!firstChapterId) {
            return jsonify({ urls: [] })
        }

        // 2. Get Audio URL for the chapter
        // Original logic: `/api/content?item_id=${itemId}&tab=听书&tone_id=1`
        const contentUrl = `${API_HOST}/api/content?item_id=${firstChapterId}&tab=${encodeURIComponent('听书')}&tone_id=1`
        const contentJson = await request(contentUrl)

        if (contentJson && contentJson.data && contentJson.data.content) {
            return jsonify({
                urls: [contentJson.data.content],
                headers: [{
                    'User-Agent': UA
                }],
                // Try to keep basic info
                cover: 'https://www.18zf.net/d/file/p/2023/1107/3ty5orktxrc.jpg'
            })
        }

        return jsonify({ urls: [] })

    } catch (error) {
        return jsonify({
            urls: []
        })
    }
}
