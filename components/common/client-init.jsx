"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { parallaxMouseMovement, parallaxScroll } from "@/utlis/parallax";
import { init_wow } from "@/utlis/init-wowjs";
import { headerChangeOnScroll } from "@/utlis/change-header-on-scroll";

// Per-route client-side init (WOW.js, parallax, sticky header). Lives in its
// own client component so the root layout can stay a Server Component and
// export metadata.
export default function ClientInit() {
  const path = usePathname();

  useEffect(() => {
    init_wow();
    parallaxMouseMovement();
    var mainNav = document.querySelector(".main-nav");
    if (mainNav?.classList.contains("transparent")) {
      mainNav.classList.add("js-transparent");
    } else if (!mainNav?.classList?.contains("dark")) {
      mainNav?.classList.add("js-no-transparent-white");
    }

    window.addEventListener("scroll", headerChangeOnScroll);
    const cleanupParallax = parallaxScroll();
    return () => {
      window.removeEventListener("scroll", headerChangeOnScroll);
      cleanupParallax();
    };
  }, [path]);

  return null;
}
