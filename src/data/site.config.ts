interface SiteConfig {
    author: string;
    title: string;
    description: string;
    lang: string;
    ogLocale: string;
    shareMessage: string;
    paginationSize: number;
}

export const siteConfig: SiteConfig = {
    author: 'Miro Ostafinski', // Site author
    title: 'Miro Ostafinski | web developer', // Site title.
    description: 'My personal blog about web development and programming.', // Website description used for RSS feeds/meta description tag.
    lang: 'en-GB',
    ogLocale: 'en_GB',
    shareMessage: 'Share this post', // Message to share a post on social media
    paginationSize: 6, // Number of posts per page
};
