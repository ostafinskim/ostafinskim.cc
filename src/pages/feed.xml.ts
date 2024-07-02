import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

interface Context {
    site: string;
}

export async function GET(context: Context) {
    const posts = await getCollection('blog');
    return rss({
        title: 'Miro Ostafinski - Full Stack Developer',
        description:
            'Miro Ostafinski - Full Stack Developer - Blog about web development, programming, and software engineering.',
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: new Date(post.data.pubDate),
            description: post.data.description,
            link: `/posts/${post.slug}/`,
        })),
        customData: `<language>en-us</language>`,
    });
}
