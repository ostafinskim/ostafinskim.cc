import React from "react";
import Awards from "./awards";
import Services from "./services";
import Portfolio from "./portfolio";
import Contact from "./contact";
import Faq from "./faq";
import Link from "next/link";
import Image from "next/image";
import AnimatedLink from "@/components/common/animated-link";
import OutlineTitle from "@/components/common/outline-title";
import PostCard from "@/components/blog/post-card";
import { site } from "@/data/site";

function Divider({ dark }) {
  return (
    <hr className={`${dark ? "white opacity-015" : "black"} mt-0 mb-0`} />
  );
}

export default function Home2({ dark = false, posts = [] }) {
  const sectionClass = `page-section scrollSpysection ${
    dark ? "bg-dark-1 light-content" : ""
  }`;
  return (
    <>
      <section className={`${sectionClass} pb-0`} id="about">
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
                <OutlineTitle text="About" />
                <p className="section-text mb-60 mb-md-40 mb-sm-30">
                  Full-stack TypeScript developer with 4+ years of commercial
                  experience building modern web applications end to end
                  &mdash; from type-safe APIs and PostgreSQL data models
                  through to polished, responsive React interfaces. I've
                  worked on everything from high-traffic public sector
                  platforms to secure internal business systems, and I care
                  most about writing code that's clean, maintainable, and
                  reliable in production. My core stack: TypeScript,
                  Next.js, React, Node.js, PostgreSQL and Tailwind CSS.
                </p>
                <div className="local-scroll">
                  <AnimatedLink href="#services">
                    Learn more <span className="visually-hidden">about us</span>
                  </AnimatedLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={sectionClass} id="experience">
        <Awards />
      </section>
      <Divider dark={dark} />
      <section className={sectionClass} id="services">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 mb-md-80">
              <OutlineTitle text="Skills" />
              <p className="section-text mb-60 mb-md-40 mb-sm-30">
                What I bring to a project &mdash; and the stack I build it
                with.
              </p>
              <div className="local-scroll">
                <AnimatedLink href="#contact">Get in touch</AnimatedLink>
              </div>
            </div>
            <div className="col-lg-7 col-xl-6 offset-xl-1">
              <Faq />
            </div>
          </div>
          <div className="page-section">
            <Divider dark={dark} />
          </div>
          <Services />
        </div>
      </section>
      <Divider dark={dark} />
      <section className={sectionClass} id="portfolio">
        <Portfolio />
      </section>
      {posts.length > 0 && (
        <>
          <Divider dark={dark} />
          <section className={sectionClass} id="blog">
            <div className="container">
              <div className="row mb-60 mb-md-40">
                <div className="col-lg-8">
                  <OutlineTitle text="Writing" className="mt-20 mb-30" />
                  <p className="section-text mb-0">
                    Notes on web development, JavaScript and building for the
                    web.
                  </p>
                </div>
                <div className="col-lg-4 d-flex align-items-end justify-content-lg-end">
                  <div className="local-scroll mt-20">
                    <AnimatedLink href="/blog">All posts</AnimatedLink>
                  </div>
                </div>
              </div>
              <div className="row gx-5">
                {posts.map((post) => (
                  <PostCard
                    key={post.slug}
                    post={post}
                    className="col-md-6 col-lg-4 mb-md-50 mb-sm-30"
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
      <Divider dark={dark} />
      <section className={sectionClass} id="contact">
        <Contact />
      </section>
    </>
  );
}
