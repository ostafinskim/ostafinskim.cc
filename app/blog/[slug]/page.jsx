import { getAllPosts, getPost } from "@/lib/posts";
import BlogPostView from "@/components/blog/blog-post-view";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props) {
  const { slug } = await props.params;
  const post = getPost(slug);
  return {
    title: `${post.title} — Miro Ostafinski`,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      // og:image comes from the sibling opengraph-image.jsx (dynamic PNG).
    },
  };
}

export default async function BlogSinglePage(props) {
  const { slug } = await props.params;
  const post = getPost(slug);
  return <BlogPostView post={post} />;
}
