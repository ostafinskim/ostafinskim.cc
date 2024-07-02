import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import compress from 'astro-compress';
import rehypeSlug from 'rehype-slug';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism';
import { remarkReadingTime } from './remark-reading-time.js';

export default defineConfig({
    site: 'https://ostafinski.cc',
    markdown: {
        syntaxHighlight: 'shiki',
        shikiConfig: {
            themes: {
                light: 'dark-plus',
                dark: "dark-plus",
            },
            langs: [
                'js',
                'jsx',
                'javascript',
                'tsx',
                'astro',
                'mdx',
                'markdown',
            ],
            wrap: true,
            transformers: [],
        },
        rehypePlugins: [
            rehypeSlug,
            rehypeAutoLinkHeadings,
            rehypeCodeTitles,
            rehypePrism,
        ],
        remarkPlugins: [remarkReadingTime],
    },
    integrations: [
        tailwind({ config: { applyBaseStyles: false } }),
        mdx(),
        sitemap(),
        compress(),
    ],
});
