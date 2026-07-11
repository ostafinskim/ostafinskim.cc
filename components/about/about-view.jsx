"use client";
import Image from "next/image";
import AnimatedLink from "@/components/common/animated-link";
import OutlineTitle from "@/components/common/outline-title";
import PageHero from "@/components/common/page-hero";
import ThemedShell from "@/components/common/themed-shell";
import { siteMenu } from "@/data/menu";
import { site } from "@/data/site";

export default function AboutView() {
  return (
    <ThemedShell links={siteMenu}>
      {(dark) => (
        <>
          <PageHero title="About Me" dark={dark} />

          <section
            className={`page-section ${dark ? "bg-dark-1 light-content" : ""}`}
            id="about"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-5 order-last order-md-first">
                  <div className="overflow-hidden">
                    <Image
                      width={800}
                      height={1095}
                      src="/assets/images/gen/about.svg"
                      className="w-100 wow scaleOutIn"
                      alt={site.name}
                    />
                  </div>
                </div>
                <div className="col-md-7 col-lg-6 offset-lg-1 d-flex align-items-center mb-sm-80">
                  <div className="wow fadeInUp">
                    <OutlineTitle text="My Story" />
                    <p className="section-text mb-30">
                      I'm a full-stack TypeScript developer with 4+ years of
                      commercial experience building modern web applications end
                      to end — from type-safe APIs and PostgreSQL data models
                      through to polished, responsive React interfaces. I care
                      most about writing code that's clean, maintainable and
                      reliable in production.
                    </p>
                    <p className="mb-60 mb-md-40 mb-sm-30">
                      Since 2022 I've delivered responsive, accessible solutions
                      at Studio 24 for clients including the W3C, UK Parliament,
                      HS2 and The Fitzwilliam Museum — and I'm now building the
                      web applications powering TaxAssist Group. Before that, a
                      full-stack internship at intive. My core stack: TypeScript,
                      Next.js, React, Node.js, PostgreSQL and Tailwind CSS.
                    </p>
                    <div className="local-scroll">
                      <AnimatedLink href="/#contact">Get in touch</AnimatedLink>
                    </div>
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
