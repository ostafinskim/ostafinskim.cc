"use client";
import { useEffect, useRef, useState } from "react";
import Header2 from "@/components/headers/header-2";
import Footer2 from "@/components/footers/footer-2";
import { headerChangeOnScroll } from "@/utlis/change-header-on-scroll";

// Shared page shell for the multi-page routes (about, work, blog). Owns the
// light/dark theme state + toggle, matching the one-pager. The nav className is
// kept CONSTANT so React never strips WOW.js's `.animated` class (which would
// hide the navbar); theme classes are flipped imperatively via classList.
// `children` may be a render function `(dark) => JSX` so page sections can pick
// theme-aware background classes.
export default function ThemedShell({
  links,
  initialDark = true,
  footerClass = "bg-dark-2",
  children,
}) {
  const [dark, setDark] = useState(initialDark);
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    nav.classList.toggle("dark", dark);
    nav.classList.toggle("dark-mode", dark);
    headerChangeOnScroll();
    // The theme lives on a div inside <body>; the document background stays
    // white by default, so fast scrolling flashes white where the compositor
    // hasn't painted yet (and on overscroll). Keep it in sync with the theme.
    const bg = dark ? "#08090a" : "#ffffff";
    document.documentElement.style.backgroundColor = bg;
    document.body.style.backgroundColor = bg;
  }, [dark]);

  return (
    <div className={`theme-bold theme-me ${dark ? "dark-mode" : ""}`}>
      <div className={`page ${dark ? "bg-dark-1" : ""}`} id="top">
        <nav
          ref={navRef}
          className={`main-nav ${
            initialDark ? "dark dark-mode " : ""
          }transparent stick-fixed wow-menubar`}
        >
          <Header2
            links={links}
            dark={dark}
            onToggleTheme={() => setDark((d) => !d)}
          />
        </nav>
        <main id="main">
          {typeof children === "function" ? children(dark) : children}
        </main>
        <footer className={`footer-1 ${footerClass} light-content`}>
          <Footer2 />
        </footer>
      </div>
    </div>
  );
}
