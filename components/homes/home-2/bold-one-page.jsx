"use client";
import Home2 from "@/components/homes/home-2";
import Hero from "@/components/homes/home-2/heros/hero";
import ParallaxContainer from "@/components/common/parallax-container";
import ThemedShell from "@/components/common/themed-shell";
import { boldOnepage } from "@/data/menu";

export default function BoldOnePage({ initialDark = true, posts = [] }) {
  return (
    <ThemedShell
      links={boldOnepage}
      initialDark={initialDark}
      footerClass="bg-dark-1"
    >
      {(dark) => (
        <>
          <ParallaxContainer
            className={`home-section ${
              dark ? "bg-dark-alpha-60 light-content" : "bg-light-alpha-70"
            } parallax-5 scrollSpysection`}
            style={{ backgroundImage: "url(/assets/images/gen/hero.svg)" }}
            id="home"
          >
            <Hero />
          </ParallaxContainer>

          <Home2 dark={dark} posts={posts} />
        </>
      )}
    </ThemedShell>
  );
}
