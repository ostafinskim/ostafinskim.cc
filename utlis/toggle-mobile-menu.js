// In mobile mode init_classic_menu_resize() hides .desktop-nav with an inline
// display:none, so opening must restore display and closing must re-hide it —
// toggling max-height alone leaves the menu invisible.
const closeMenu = (mobileNav, desktopNav) => {
  desktopNav.style.maxHeight = "0px";
  desktopNav.classList.remove("js-opened");
  mobileNav.classList.remove("active");
  mobileNav.setAttribute("aria-expanded", "false");
  if (document.querySelector(".main-nav")?.classList.contains("mobile-on")) {
    desktopNav.style.display = "none";
  }
};

export const toggleMobileMenu = () => {
  var mobileNav = document.querySelector(".mobile-nav");
  var desktopNav = document.querySelector(".desktop-nav");

  if (desktopNav.classList.contains("js-opened")) {
    closeMenu(mobileNav, desktopNav);
  } else {
    desktopNav.style.display = "block";
    desktopNav.style.maxHeight = "calc(100vh - 60px)";
    desktopNav.classList.add("js-opened");
    mobileNav.classList.add("active");
    mobileNav.setAttribute("aria-expanded", "true");
  }
};

export const closeMobileMenu = () => {
  var mobileNav = document.querySelector(".mobile-nav");
  var desktopNav = document.querySelector(".desktop-nav");

  if (desktopNav.classList.contains("js-opened")) {
    closeMenu(mobileNav, desktopNav);
  }
};
