"use client";

import addScrollspy from "@/utlis/add-scroll-spy";
import { init_classic_menu_resize } from "@/utlis/menu-toggle";
import { scrollToElement } from "@/utlis/scroll-to-element";
import { closeMobileMenu } from "@/utlis/toggle-mobile-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function OnePageNav({ links, animateY = false }) {
  useEffect(() => {
    setTimeout(() => {
      scrollToElement();
    }, 1000);
    init_classic_menu_resize();
    window.addEventListener("scroll", addScrollspy);

    window.addEventListener("resize", init_classic_menu_resize);

    return () => {
      window.removeEventListener("scroll", addScrollspy);
      window.removeEventListener("resize", init_classic_menu_resize);
    };
  }, []);
  const pathname = usePathname();

  return (
    <>
      {links[0].href?.includes("/") &&
        links.map((link, index) => (
          <li key={index}>
            <Link
              className={
                pathname.split("/")[1] == link.href.split("/")[1]
                  ? "active"
                  : ""
              }
              href={link.href}
              onClick={() => closeMobileMenu()}
            >
              {animateY ? (
                <span className="btn-animate-y">
                  <span className="btn-animate-y-1">{link.text}</span>
                  <span className="btn-animate-y-2" aria-hidden="true">
                    {link.text}
                  </span>
                </span>
              ) : (
                link.text
              )}
            </Link>
          </li>
        ))}
      {!links[0].href?.includes("/") &&
        links.map((link, index) => (
          <li className="scrollspy-link" key={index}>
            <a onClick={() => closeMobileMenu()} className="" href={link.href}>
              {animateY ? (
                <span className="btn-animate-y">
                  <span className="btn-animate-y-1">{link.text}</span>
                  <span className="btn-animate-y-2" aria-hidden="true">
                    {link.text}
                  </span>
                </span>
              ) : (
                link.text
              )}
            </a>
          </li>
        ))}
    </>
  );
}
