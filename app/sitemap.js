import { getAllPosts } from "@/lib/posts";
import { portfolios2 } from "@/data/portfolio";

const BASE_URL = "https://ostafinskim.cc";

export default function sitemap() {
  const staticRoutes = ["", "/about", "/blog"].map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const posts = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const work = portfolios2.map((item) => ({
    url: `${BASE_URL}/work/${item.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...posts, ...work];
}
