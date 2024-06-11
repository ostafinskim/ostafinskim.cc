import { defineConfig, squooshImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { remarkReadingTime } from './src/utils/readTime.ts';

export default defineConfig({
    site: 'https://ostafinski.cc',
    markdown: {
        remarkPlugins: [remarkReadingTime],
        drafts: true,
        shikiConfig: {
            theme: 'dracula',
            themes: {
                light: 'vitesse-light',
                dark: 'houston',
            },
        },
    },
    image: {
        service: squooshImageService(),
    },
    integrations: [
        mdx({
            syntaxHighlight: 'shiki',
            drafts: true,
        }),
        sitemap(),
        tailwind(),
    ],
});
