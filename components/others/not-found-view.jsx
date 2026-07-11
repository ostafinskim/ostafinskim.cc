"use client";
import Link from "next/link";
import ThemedShell from "@/components/common/themed-shell";
import { siteMenu } from "@/data/menu";

export default function NotFoundView() {
  return (
    <ThemedShell links={siteMenu}>
      {(dark) => (
        <section
          className={`page-section min-height-100vh d-flex align-items-center ${
            dark ? "bg-dark-1 light-content" : ""
          }`}
        >
          <div className="container text-center">
            <div className="wow fadeInUp" data-wow-delay=".1s">
              <h1 className="hs-title-12 mb-40 mb-sm-30">404</h1>
            </div>
            <div className="mb-40 mb-sm-30 wow fadeInUp" data-wow-delay=".2s">
              <h2 className="section-descr mb-20">
                The page you were looking for could not be found.
              </h2>
            </div>
            <div className="local-scroll wow fadeInUp" data-wow-delay=".3s">
              <Link
                href="/"
                className="btn btn-mod btn-w btn-round btn-medium btn-hover-anim"
              >
                <i className="mi-arrow-left size-24 align-center" />
                <span>Back To Home Page</span>
              </Link>
            </div>
          </div>
        </section>
      )}
    </ThemedShell>
  );
}
