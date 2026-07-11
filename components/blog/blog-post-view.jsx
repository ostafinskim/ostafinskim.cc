"use client";
import Link from "next/link";
import PageHero from "@/components/common/page-hero";
import ThemedShell from "@/components/common/themed-shell";
import { siteMenu } from "@/data/menu";

export default function BlogPostView({ post }) {
  return (
    <ThemedShell links={siteMenu}>
      {(dark) => (
        <>
          <PageHero
            title={post.title}
            dark={dark}
            titleClass="section-title-medium"
          >
            <div
              className="blog-item-data mt-30 mt-sm-10 mb-0 wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="d-inline-block me-3">
                <i className="mi-clock size-16" />{" "}
                <span className="visually-hidden">Date:</span> {post.date}
              </div>
              <div className="d-inline-block me-3">
                <i className="mi-user size-16" />{" "}
                <span className="visually-hidden">Author:</span> {post.author}
              </div>
              {post.tags?.length > 0 && (
                <div className="d-inline-block me-3">
                  <i className="mi-folder size-16" />{" "}
                  <span className="visually-hidden">Tags:</span>{" "}
                  {post.tags.join(", ")}
                </div>
              )}
            </div>
          </PageHero>

          <section
            className={`page-section ${dark ? "bg-dark-1 light-content" : ""}`}
          >
            <div className="container relative">
              <div className="row">
                <div className="col-lg-8 offset-lg-2 mb-md-80">
                  <div className="blog-item mb-80 mb-xs-40">
                    <div
                      className="blog-item-body"
                      dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                    />
                  </div>
                  <div className="clearfix mt-40">
                    <Link href="/blog" className="blog-item-more circle left">
                      <i className="mi-chevron-left" />
                      &nbsp;All posts
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </ThemedShell>
  );
}
