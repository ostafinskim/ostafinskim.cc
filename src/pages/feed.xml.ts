import rss from '@astrojs/rss';

type Context = {
    site: string;
};

type Post = {
    frontmatter: {
        title: string;
        summary: string;
        publishedAt: string;
    };
    slug: string;
};

export async function GET(context: Context) {
    const posts = await import.meta.glob<Post>('./blog/*.md');
    const items = await Promise.all(
        Object.values(posts).map(async (post) => await post())
    );

    console.log(items);
    return rss({
        title: `Miro Ostafinski's Blog`,
        description: "A humble Astronaut's guide to the stars",
        site: context.site,
        items: items.map((post) => ({
            link: `/blog/${post.slug}/`,
            title: post.frontmatter.title,
            description: post.frontmatter.summary,
            pubDate: new Date(Date.parse(post.frontmatter.publishedAt)),
        })),
    });
}
