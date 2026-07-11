"use client";

import { useEffect } from "react";

export default function ParallaxContainer(props) {
  useEffect(() => {
    // jarallax touches `document` at import time, so load it lazily on the
    // client — the surrounding markup itself must stay server-rendered
    // (h1/SEO content + no layout shift).
    let cancelled = false;
    import("jarallax").then(({ jarallax }) => {
      if (cancelled) return;
      jarallax(document.querySelectorAll(".parallax-5"), {
        speed: 0.5,
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return <div {...props}>{props.children}</div>;
}
