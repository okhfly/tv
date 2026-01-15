/**********************
 * MissAV - XPTV 插件（增强版）
 **********************/

const cheerio = createCheerio();

const UA =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const host = 'https://missav.ws';

const headers = {
    'User-Agent': UA,
    Referer: host + '/cn',
};

/* ========== 配置 ========== */

let appConfig = {
    title: 'MissAV',
    site: host,
    tabs: [
        // 分类
        { id: 'chinese-subtitle', name: '中文字幕', type: 'category' },
        { id: 'new', name: '最近更新', type: 'category' },
        { id: 'release', name: '新作上市', type: 'category' },
        { id: 'today-hot', name: '今日热门', type: 'category' },
        { id: 'uncensored-leak', name: '无码流出', type: 'category' },

        // 女优
        { id: 'actress', name: '女优', type: 'actress' },

        // 标签
        { id: 'genres', name: '标签', type: 'genre' },
    ],
};

/* ========== getConfig ========== */

async function getConfig() {
    return jsonify(appConfig);
}

/* ========== getCards（核心列表） ========== */

async function getCards(ext) {
    ext = argsify(ext);

    const page = ext.page || 1;
    const type = ext.type || 'category';
    const id = ext.id;

    let url = '';

    if (type === 'category') {
        url = `${host}/cn/${id}?page=${page}`;
    }

    if (type === 'actress') {
        // 女优列表页
        url = page === 1
            ? `${host}/cn/actresses`
            : `${host}/cn/actresses?page=${page}`;
    }

    if (type === 'genre') {
        // 标签列表页
        url = page === 1
            ? `${host}/cn/genres`
            : `${host}/cn/genres?page=${page}`;
    }

    const { data } = await $fetch.get(url, { headers });
    const $ = cheerio.load(data);

    let cards = [];

    /* ===== 女优 / 标签 首页 ===== */
    if (type === 'actress' || type === 'genre') {
        $('div.thumbnail').each((_, el) => {
            const a = $(el).find('a').attr('href');
            const name = $(el).find('img').attr('alt') || '';

            if (!a) return;

            const realId = a.replace('/cn/', '').trim();

            cards.push({
                vod_id: realId,
                vod_name: name || realId,
                vod_pic: $(el).find('img').attr('data-src'),
                vod_remarks: type === 'actress' ? '女优' : '标签',
                ext: {
                    id: realId,
                    type: 'category',
                },
            });
        });

        return jsonify({ list: cards });
    }

    /* ===== 普通影片列表 ===== */
    $('div.thumbnail').each((_, el) => {
        const a = $(el).find('a').attr('href');
        if (!a) return;

        const vid = a.replace('/cn/', '').trim();
        const img = $(el).find('img');

        cards.push({
            vod_id: vid,
            vod_name: img.attr('alt') || vid,
            vod_pic: img.attr('data-src') || img.attr('src'),
            vod_remarks: $(el).find('span').text() || '',
            ext: { id: vid },
        });
    });

    return jsonify({ list: cards });
}

/* ========== getTracks（单集） ========== */

async function getTracks(ext) {
    ext = argsify(ext);

    return jsonify({
        list: [
            {
                title: '默认线路',
                tracks: [
                    {
                        name: '播放',
                        ext: { id: ext.id },
                    },
                ],
            },
        ],
    });
}

/* ========== getPlayinfo（播放解析） ========== */

async function getPlayinfo(ext) {
    ext = argsify(ext);

    const detailUrl = `${host}/cn/${ext.id}`;
    const { data } = await $fetch.get(detailUrl, { headers });

    const uuid = data.match(
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i
    )?.[0];

    if (!uuid) {
        $print('UUID not found');
        return;
    }

    return jsonify({
        urls: [`https://surrit.com/${uuid}/playlist.m3u8`],
        headers: [
            {
                Referer: detailUrl,
                'User-Agent': UA,
            },
        ],
    });
}

/* ========== search ========== */

async function search(ext) {
    ext = argsify(ext);

    if ((ext.page || 1) > 1) return;

    const url = `${host}/cn/search/${encodeURIComponent(ext.text)}`;
    const { data } = await $fetch.get(url, { headers });
    const $ = cheerio.load(data);

    let cards = [];

    $('div.thumbnail').each((_, el) => {
        const a = $(el).find('a').attr('href');
        if (!a) return;

        const id = a.replace('/cn/', '').trim();
        const img = $(el).find('img');

        cards.push({
            vod_id: id,
            vod_name: img.attr('alt') || id,
            vod_pic: img.attr('data-src') || img.attr('src'),
            vod_remarks: '搜索结果',
            ext: { id },
        });
    });

    return jsonify({ list: cards });
}
