import AnimatedText from "@/components/common/animated-text";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <div className="container min-height-100vh d-flex align-items-center pt-100 pb-100 pt-sm-120 pb-sm-120">
      {/* Home Section Content */}
      <div className="home-content pt-20 pt-md-0 text-center">
        <h2 className="section-title-tiny font-alt mb-40 mb-sm-30 wow fadeInUp">
          Hi, I’m {site.name}
        </h2>
        <h1 className="hs-title-4 font-alt mb-40 mb-sm-30">
          <AnimatedText text={site.role} />
        </h1>
        <p
          className="section-descr mb-60 mb-sm-40 wow fadeInUp"
          data-wow-delay="0.4s"
        >
          {site.tagline}
        </p>
        <div
          className="local-scroll wow fadeInUp"
          data-wow-delay="0.6s"
          data-wow-offset={0}
        >
          <a
            href="#portfolio"
            className="btn btn-mod btn-large btn-border btn-border-white btn-circle"
            data-btn-animate="y"
          >
            <span className="btn-animate-y">
              <span className="btn-animate-y-1">
                Discover Work{" "}
                <i className="icon-arrow-right1 size-16" aria-hidden="true" />
              </span>
              <span className="btn-animate-y-2" aria-hidden="true">
                Discover Work{" "}
                <i className="icon-arrow-right1 size-16" aria-hidden="true" />
              </span>
            </span>
          </a>
        </div>
      </div>
      {/* End Home Section Content */}
      {/* Scroll Down */}
      <div
        className="local-scroll scroll-down-wrap-4 wow fadeInUp"
        data-wow-offset={0}
      >
        <div className="full-wrapper text-end">
          <a
            href="#about"
            className="scroll-down-4"
            aria-label="Scroll down to about section"
          >
            <i className="icon-arrow-down1 size-22" aria-hidden="true" />
          </a>
        </div>
      </div>
      {/* End Scroll Down */}
      {/* Status */}
      <div className="hs-status wow fadeInUp" data-wow-offset={0}>
        Currently building at TaxAssist Group
      </div>
      {/* End Status */}
    </div>
  );
}
