export const siteConfig = {
    title: 'Robin Blog',
    author: 'Robin',
    email: 'hello@robinren.me',
    description: 'Recording life and growth',
    language: 'zh-CN',
    link: 'https://robinren.me',
    notionPageId: process.env.NOTION_PAGE_ID || '067dd719a912471ea9a3ac10710e7fdf', // Default to the demo ID if env is missing
    notionAccessToken: process.env.NOTION_ACCESS_TOKEN,
    // Hidden Token Use page in the Blogs database (type Hidden, slug token-use).
    // Must never appear in post/page/photography listings. Set NOTION_TOKEN_USE_PAGE_ID
    // on the host; if unset, /projects falls back to public/data/token-usage.json.
    notionTokenUsePageId: process.env.NOTION_TOKEN_USE_PAGE_ID,

    // SEO
    keywords: ['Blog', 'Tech', 'Life'],

    // Blog settings
    postsPerPage: 10,
    sortByDate: true,

    // Feature toggles
    previewImagesEnabled: false,

    // Giscus Comments
    comment: {
        // provider: 'giscus', // supported providers: giscus, utterances, disqus
        giscusConfig: {
            repo: process.env.NEXT_PUBLIC_GISCUS_REPO || '',
            repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '',
            category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || '',
            categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '',
            mapping: 'pathname', // supported options: pathname, url, title, og:title
            reactionsEnabled: '1', // Emoji reactions: 1 = enable / 0 = disable
            emitMetadata: '0',
            inputPosition: 'top', // supported options: top, bottom
            lang: 'zh-CN',
            loading: 'lazy',
        },
    },
};
