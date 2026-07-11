export function init_classic_menu_resize() {
  var mobile_nav = document.querySelector(".mobile-nav");
  var desktop_nav = document.querySelector(".desktop-nav");

  mobile_nav.setAttribute("aria-expanded", "false");

  // Mobile menu max height
  if (document.querySelector(".main-nav")) {
    document.querySelector(".desktop-nav > ul").style.maxHeight =
      window.innerHeight -
      document.querySelector(".main-nav").offsetHeight -
      20 +
      "px";
  }

  // Mobile menu style toggle
  if (window.innerWidth <= 1024) {
    document.querySelector(".main-nav").classList.add("mobile-on");
    if (!mobile_nav.classList.contains("active")) {
      desktop_nav.style.display = "none";
    }
  } else if (window.innerWidth > 1024) {
    document.querySelector(".main-nav").classList.remove("mobile-on");
    desktop_nav.style.display = "block";
  }
}
