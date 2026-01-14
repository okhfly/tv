//来自群友“tou tie”
const cheerio = createCheerio()

// 设置User Agent，模拟iPhone浏览器
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0'

let appConfig = {
    ver: 1,
    title: '肉视频',
    site: 'https://rou.video',
    tabs: [
        {
            name: '國產AV',
            ui: 1,
            ext: {
                url: 'https://rou.video/t/國產AV',
            },
        },

        {
            name: '探花',
            ui: 1,
            ext: {
                url: 'https://rou.video/t/探花',
            },
        },
        {
            name: '自拍流出',
            ui: 1,
            ext: {
                url: 'https://rou.video/t/自拍流出',
            },
        },
        {
            name: 'OnlyFans',
            ui: 1,
            ext: {
                url: 'https://rou.video/t/OnlyFans',
            },
        },

        {
            name: '日本',
            ui: 1,
            ext: {
                url: 'https://rou.video/t/日本',
            },
        },
        {
            name: '91沈先生',
            ui: 1,
            ext: { url: 'https://rou.video/t/91沈先生' },
        },
        {
            name: '探花精選400',
            ui: 1,
            ext: { url: 'https://rou.video/t/探花精選400' },
        },
        {
            name: '小寶尋花',
            ui: 1,
            ext: { url: 'https://rou.video/t/小寶尋花' },
        },
        {
            name: '91lisa',
            ui: 1,
            ext: { url: 'https://rou.video/t/91lisa' },
        },
        {
            name: '調教小景甜',
            ui: 1,
            ext: { url: 'https://rou.video/t/調教小景甜' },
        },
        {
            name: '午夜尋花',
            ui: 1,
            ext: { url: 'https://rou.video/t/午夜尋花' },
        },
        {
            name: '91鳳鳴鳥唱',
            ui: 1,
            ext: { url: 'https://rou.video/t/91鳳鳴鳥唱' },
        },
        {
            name: '大神精選',
            ui: 1,
            ext: { url: 'https://rou.video/t/大神精選' },
        },
        {
            name: 'AVOVE直播',
            ui: 1,
            ext: { url: 'https://rou.video/t/AVOVE直播' },
        },
        {
            name: '91貓先生',
            ui: 1,
            ext: { url: 'https://rou.video/t/91貓先生' },
        },
        {
            name: '千人斬探花',
            ui: 1,
            ext: { url: 'https://rou.video/t/千人斬探花' },
        },
        {
            name: '全國探花',
            ui: 1,
            ext: { url: 'https://rou.video/t/全國探花' },
        },
        {
            name: '91Fans',
            ui: 1,
            ext: { url: 'https://rou.video/t/91Fans' },
        },
        {
            name: '七天探花',
            ui: 1,
            ext: { url: 'https://rou.video/t/七天探花' },
        },
        {
            name: '9總全國探花',
            ui: 1,
            ext: { url: 'https://rou.video/t/9總全國探花' },
        },
        {
            name: '91大神 @LovELolita7',
            ui: 1,
            ext: { url: 'https://rou.video/t/91大神 @LovELolita7' },
        },
        {
            name: '18歲母狗無限高潮',
            ui: 1,
            ext: { url: 'https://rou.video/t/18歲母狗無限高潮' },
        },
        {
            name: '鴨哥探花',
            ui: 1,
            ext: { url: 'https://rou.video/t/鴨哥探花' },
        },
        {
            name: '錘子探花',
            ui: 1,
            ext: { url: 'https://rou.video/t/錘子探花' },
        },
        {
            name: '探花合集',
            ui: 1,
            ext: { url: 'https://rou.video/t/探花合集' },
        },
        {
            name: '91不見星空',
            ui: 1,
            ext: { url: 'https://rou.video/t/91不見星空' },
        },
        {
            name: '早期東莞ISO桑拿系列',
            ui: 1,
            ext: { url: 'https://rou.video/t/早期東莞ISO桑拿系列' },
        },
        {
            name: '91康先生',
            ui: 1,
            ext: { url: 'https://rou.video/t/91康先生' },
        },
        {
            name: '肉オナホ',
            ui: 1,
            ext: { url: 'https://rou.video/t/肉オナホ' },
        },
        {
            name: '91大神唐伯虎',
            ui: 1,
            ext: { url: 'https://rou.video/t/91大神唐伯虎' },
        },
        {
            name: '91風流哥全集',
            ui: 1,
            ext: { url: 'https://rou.video/t/91風流哥全集' },
        },
        {
            name: '韋小寶',
            ui: 1,
            ext: { url: 'https://rou.video/t/韋小寶' },
        },
        {
            name: '91蜜桃的合集',
            ui: 1,
            ext: { url: 'https://rou.video/t/91蜜桃的合集' },
        },
        {
            name: '換妻探花',
            ui: 1,
            ext: { url: 'https://rou.video/t/換妻探花' },
        },
        {
            name: '91大神括約肌大叔',
            ui: 1,
            ext: { url: 'https://rou.video/t/91大神括約肌大叔' },
        },
        {
            name: '小陳頭星選',
            ui: 1,
            ext: { url: 'https://rou.video/t/小陳頭星選' },
        },
        {
            name: '情侶自拍',
            ui: 1,
            ext: { url: 'https://rou.video/t/情侶自拍' },
        },
        {
            name: '探花精選',
            ui: 1,
            ext: { url: 'https://rou.video/t/探花精選' },
        },
        {
            name: '91呆哥',
            ui: 1,
            ext: { url: 'https://rou.video/t/91呆哥' },
        },
        {
            name: 'mmmn753',
            ui: 1,
            ext: { url: 'https://rou.video/t/mmmn753' },
        },
        {
            name: '楊導撩妹',
            ui: 1,
            ext: { url: 'https://rou.video/t/楊導撩妹' },
        },
        {
            name: '太子探花',
            ui: 1,
            ext: { url: 'https://rou.video/t/太子探花' },
        },
        {
            name: '歌廳探花陳先生',
            ui: 1,
            ext: { url: 'https://rou.video/t/歌廳探花陳先生' },
        },
        {
            name: '91美女涵菱',
            ui: 1,
            ext: { url: 'https://rou.video/t/91美女涵菱' },
        },
        {
            name: 'jimmybiiig',
            ui: 1,
            ext: { url: 'https://rou.video/t/jimmybiiig' },
        },
        {
            name: '91唐哥',
            ui: 1,
            ext: { url: 'https://rou.video/t/91唐哥' },
        },
        {
            name: '小馬尋花',
            ui: 1,
            ext: { url: 'https://rou.video/t/小馬尋花' },
        },
        {
            name: '91天堂原創',
            ui: 1,
            ext: { url: 'https://rou.video/t/91天堂原創' },
        },

    ],
}

async function getConfig() {
    let config = appConfig
    return jsonify(config)
}

async function getCards(ext) {
    ext = argsify(ext)
    let cards = []
    let { page = 1, url } = ext

    if (page > 1) {
        url += `?order=createdAt&page=${page}`
    }

    const { data } = await $fetch.get(url, {
        headers: {
            'User-Agent': UA,
        },
    })

    const $ = cheerio.load(data)

    $('.grid.grid-cols-2.mb-6 > div').each((_, element) => {
        if ($(element).find('.relative').length == 0) return
        const href = $(element).find('.relative a').attr('href')
        const title = $(element).find('img:last').attr('alt')
        const cover = $(element).find('img').attr('src')
        const subTitle = $(element).find('.relative a > div:eq(1)').text()
        const hdinfo = $(element).find('.relative a > div:first').text()
        cards.push({
            vod_id: href,
            vod_name: title,
            vod_pic: cover,
            vod_remarks: subTitle || hdinfo,
            ext: {
                url: appConfig.site + href,
            },
        })
    })

    return jsonify({
        list: cards,
    })
}

async function getTracks(ext) {
    ext = argsify(ext)
    let tracks = []
    let url = ext.url.match(/https?:\/\/rou\.video\/v\/(\w+)/)[1]
    let playUrl = `https://rou.video/api/v/${url}`
    tracks.push({
        name: '播放',
        pan: '',
        ext: {
            url: playUrl,
        },
    })

    return jsonify({
        list: [
            {
                title: '默认分组',
                tracks,
            },
        ],
    })
}

async function getPlayinfo(ext) {
    ext = argsify(ext)
    const url = ext.url
    const { data } = await $fetch.get(url, {
        headers: {
            'User-Agent': UA,
        },
    })
    const reslut = argsify(data)

    const playurl = reslut.video.videoUrl


    return jsonify({ urls: [playurl], headers: [{ 'User-Agent': UA }] })
}

async function search(ext) {
    ext = argsify(ext)
    let cards = []

    let text = encodeURIComponent(ext.text)
    let page = ext.page || 1
    let url = `${appConfig.site}/search?q=${text}&t=&page=${page}`

    const { data } = await $fetch.get(url, {
        headers: {
            'User-Agent': UA,
        },
    })

    const $ = cheerio.load(data)

    $('.grid.grid-cols-2.mb-6 > div').each((_, element) => {
        if ($(element).find('.relative').length == 0) return
        const href = $(element).find('.relative a').attr('href')
        const title = $(element).find('img:last').attr('alt')
        const cover = $(element).find('img').attr('src')
        const subTitle = $(element).find('.relative a > div:eq(1)').text()
        const hdinfo = $(element).find('.relative a > div:first').text()
        cards.push({
            vod_id: href,
            vod_name: title,
            vod_pic: cover,
            vod_remarks: subTitle || hdinfo,
            ext: {
                url: appConfig.site + href,
            },
        })
    })

    return jsonify({
        list: cards,
    })
}
