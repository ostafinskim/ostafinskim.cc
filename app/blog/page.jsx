import { getAllPosts } from "@/lib/posts";
import BlogListView from "@/components/blog/blog-list-view";

export const metadata = {
  title: "Blog — Miro Ostafinski",
  description:
    "Articles on web development, JavaScript and software engineering.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogListView posts={posts} />;
}
