"use client";
import PageHero from "@/components/common/page-hero";
import ThemedShell from "@/components/common/themed-shell";
import { siteMenu } from "@/data/menu";
import PostCard from "./post-card";

export default function BlogListView({ posts = [] }) {
  return (
    <ThemedShell links={siteMenu}>
      {(dark) => (
        <>
          <PageHero title="Blog" dark={dark} />

          <section
            className={`page-section ${dark ? "bg-dark-1 light-content" : ""}`}
            id="blog"
          >
            <div className="container position-relative">
              <div className="row gx-5 mt-n50 mt-sm-n30 mb-50 mb-sm-30">
                {posts.map((post) => (
                  <PostCard
                    key={post.slug}
                    post={post}
                    headingTag="h2"
                    className="col-md-6 col-lg-4 mt-50 mt-sm-30"
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </ThemedShell>
  );
}
