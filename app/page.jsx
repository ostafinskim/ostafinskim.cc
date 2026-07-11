import BoldOnePage from "@/components/homes/home-2/bold-one-page";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Miro Ostafinski — Full Stack Developer",
  description:
    "Full-stack TypeScript developer specialising in React, Next.js, Node.js and PostgreSQL. Building accessible, production-grade web applications.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  return <BoldOnePage initialDark posts={posts} />;
}
