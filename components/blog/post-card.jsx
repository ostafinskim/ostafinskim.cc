import Image from "next/image";
import Link from "next/link";

export default function PostCard({
  post,
  className = "",
  headingTag: Heading = "h3",
}) {
  return (
    <div className={`post-prev-2 ${className}`.trim()}>
      <div className="post-prev-2-img">
        <Link href={`/blog/${post.slug}`}>
          <Image src={post.image} width={700} height={479} alt={post.title} />
        </Link>
      </div>
      <Heading className="post-prev-2-title">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </Heading>
      <div className="post-prev-2-info">{post.date}</div>
      <p className="post-prev-2-text">{post.description}</p>
    </div>
  );
}
