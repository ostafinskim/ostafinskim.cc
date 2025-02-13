import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";
import rehypeSlug from "rehype-slug";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism";
import { remarkReadingTime } from "./remark-reading-time.js";
import react from '@astrojs/react';
// https://astro.build/config
export default defineConfig({
  site: "https://ostafinski.cc",
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      themes: {
        light: "kanagawa-wave",
        dark: "kanagawa-wave",
      },
      langs: ["js", "jsx", "javascript", "tsx", "astro", "mdx", "markdown"],
      wrap: true,
      transformers: [],
    },
    rehypePlugins: [rehypeSlug, rehypeAutoLinkHeadings, rehypeCodeTitles],
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [
    react(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    mdx(),
    sitemap(),
    compress({
      html: true,
      css: true,
      js: true,
      img: true,
      svg: true,
    }),
  ],
  headers: [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000",
        },
      ],
    },
  ],
});
