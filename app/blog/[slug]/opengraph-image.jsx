import { getPost } from "@/lib/posts";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Blog post — Miro Ostafinski";

export default async function Image(props) {
  const { slug } = await props.params;
  const post = getPost(slug);
  return renderOgImage({
    eyebrow: "Blog",
    title: post.title,
    subtitle: post.description,
  });
}
