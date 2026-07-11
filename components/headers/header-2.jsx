"use client";
import Link from "next/link";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import { toggleMobileMenu } from "@/utlis/toggle-mobile-menu";
import { site } from "@/data/site";
import Nav from "./components/nav";

export default function Header2({ links, dark, onToggleTheme }) {
  return (
    <div className="main-nav-sub full-wrapper">
      <div className="nav-logo-wrap local-scroll">
        <Link href="/" className="logo logo-mark" aria-label={site.name}>
          M
        </Link>
      </div>
      {/* Mobile Menu Button */}
      <div
        onClick={toggleMobileMenu}
        className="mobile-nav"
        role="button"
        tabIndex={0}
      >
        <i className="mobile-nav-icon" />
        <span className="visually-hidden">Menu</span>
      </div>
      {/* Main Menu */}
      <div className="inner-nav desktop-nav">
        <ul className="clearlist scroll-nav local-scroll scrollspyLinks">
          <Nav links={links} />
        </ul>
        <ul className="items-end clearlist local-scroll">
          {onToggleTheme ? (
            <li className="d-flex align-items-center">
              <button
                type="button"
                onClick={onToggleTheme}
                className="theme-toggle"
                aria-pressed={dark}
                aria-label={
                  dark ? "Switch to light theme" : "Switch to dark theme"
                }
                title={dark ? "Switch to light theme" : "Switch to dark theme"}
              >
                {dark ? <BsSunFill size={16} /> : <BsMoonStarsFill size={16} />}
              </button>
            </li>
          ) : null}
          <li>
            <a href="#contact" className="opacity-1 no-hover">
              <span
                className="btn btn-mod btn-small btn-border btn-border-white btn-circle ttn"
                data-btn-animate="y"
              >
                <span className="btn-animate-y">
                  <span className="btn-animate-y-1">
                    Let’s talk{" "}
                    <i
                      className="icon-arrow-right1 size-16"
                      aria-hidden="true"
                    ></i>
                  </span>
                  <span className="btn-animate-y-2" aria-hidden="true">
                    Let’s talk{" "}
                    <i
                      className="icon-arrow-right1 size-16"
                      aria-hidden="true"
                    ></i>
                  </span>
                </span>
              </span>
            </a>
          </li>
        </ul>
      </div>
      {/* End Main Menu */}
    </div>
  );
}
