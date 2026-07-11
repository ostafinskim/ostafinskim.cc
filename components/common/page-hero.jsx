"use client";
import AnimatedText from "./animated-text";
import ParallaxContainer from "./parallax-container";

// Shared parallax page header for the multi-page routes (about, blog, work).
// `children` renders extra content under the title (e.g. blog post meta).
export default function PageHero({
  title,
  dark,
  bgImage = "/assets/images/gen/bg-1.svg",
  darkAlpha = "bg-dark-alpha-60",
  titleClass = "hs-title-4",
  children,
}) {
  return (
    <ParallaxContainer
      className={`page-section parallax-5 ${
        dark ? `${darkAlpha} light-content` : "bg-light-alpha-70"
      }`}
      style={{ backgroundImage: `url(${bgImage})` }}
      id="home"
    >
      <div className="container position-relative pt-sm-40">
        <div className="text-center">
          <h1 className={`${titleClass} font-alt mb-0`}>
            <span className="wow charsAnimInLong-1" data-splitting="chars">
              <AnimatedText text={title} />
            </span>
          </h1>
          {children}
        </div>
      </div>
    </ParallaxContainer>
  );
}
