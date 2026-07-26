"use client";
import Image from "next/image";
import PageHero from "@/components/common/page-hero";
import RelatedProject9 from "@/components/portfolio/related-projects/related-project-9";
import ThemedShell from "@/components/common/themed-shell";
import { workMenu } from "@/data/menu";

export default function WorkView({ item }) {
  return (
    <ThemedShell links={workMenu}>
      {(dark) => (
        <>
          <PageHero
            title={item.title}
            dark={dark}
            bgImage="/assets/images/gen/bg-2.svg"
            darkAlpha="bg-dark-alpha-30"
          />

          <section
            className={`page-section ${dark ? "bg-dark-1 light-content" : ""}`}
          >
            <div className="container position-relative">
              <div className="row">
                <div
                  className="col-md-4 mb-sm-40 wow fadeInUp"
                  data-wow-offset={0}
                >
                  <div className="block-sticky">
                    <h2 className="h3 mb-20">Project Details</h2>
                    <hr className="mb-20" />
                    <div className="row small">
                      <div className="col-sm-4">
                        <b>Role:</b>
                      </div>
                      <div className="col-sm-8">{item.role}</div>
                    </div>
                    <hr className="mb-20" />
                    <div className="row small">
                      <div className="col-sm-4">
                        <b>Stack:</b>
                      </div>
                      <div className="col-sm-8">{item.stack}</div>
                    </div>
                    <hr className="mb-20" />
                    <div className="small">
                      <div>
                        <b>Overview:</b>
                      </div>
                      <div>{item.description}</div>
                    </div>
                    <hr className="mb-20" />
                    {item.links?.length > 0 && (
                      <>
                        <div className="row small">
                          <div className="col-sm-4">
                            <b>Live:</b>
                          </div>
                          <div className="col-sm-8">
                            {item.links.map((link) => (
                              <div key={link.url}>
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {link.label}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                        <hr className="mb-20" />
                      </>
                    )}
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="mb-n30">
                    {item.photos.map((src, i) => (
                      <div
                        key={src}
                        className="mb-30 wow fadeInUp"
                        data-wow-offset={i === 0 ? 0 : undefined}
                      >
                        <Image
                          src={src}
                          alt={`${item.title} — screen ${i + 1}`}
                          width={1200}
                          height={819}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <hr className={`${dark ? "white opacity-015" : "black"} mt-0 mb-0`} />

          <section
            className={`page-section ${dark ? "bg-dark-1 light-content" : ""}`}
          >
            <RelatedProject9 currentSlug={item.slug} />
          </section>
        </>
      )}
    </ThemedShell>
  );
}
