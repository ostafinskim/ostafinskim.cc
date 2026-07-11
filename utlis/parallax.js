import Rellax from "rellax";

export const parallaxMouseMovement = () => {
  document.querySelectorAll(".parallax-mousemove-scene").forEach((scene) => {
    scene.addEventListener("mousemove", function (e) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const offsetX = 0.5 - (e.pageX - this.offsetLeft) / w;
      const offsetY = 0.5 - (e.pageY - this.offsetTop) / h;

      this.querySelectorAll(".parallax-mousemove").forEach((el) => {
        const offset = parseInt(el.getAttribute("data-offset"));
        const translate = `translate3d(${Math.round(
          offsetX * offset
        )}px, ${Math.round(offsetY * offset)}px, 0px)`;
        el.style.transform = translate;
      });
      
      let sceneOffsetX = e.pageX - this.offsetLeft;

      this.querySelectorAll(".parallax-mousemove-follow").forEach((el) => {
        el.style.left = `${sceneOffsetX}px`;
        el.style.top = `${31}px`;
      });
    });

    scene.addEventListener("mouseenter", function (e) {
      this.querySelectorAll(".parallax-mousemove-follow").forEach((el) => {
        setTimeout(() => {
          el.style.transition = "all .27s var(--ease-out-short)";
          el.style.willChange = "transform";
        }, 27);
      });
    });

    scene.addEventListener("mouseout", function (e) {
      this.querySelectorAll(".parallax-mousemove-follow").forEach((el) => {
        el.style.transition = "none";
      });
    });
  });
};

// Returns a cleanup function so callers can remove the window scroll
// listeners (they would otherwise accumulate on client-side navigation).
export function parallaxScroll() {
  const cleanups = [];

  const initRellax = (selector, options) => {
    if (!document.querySelectorAll(selector).length) return;
    if (window.innerWidth < 1280) return;

    const rellax = new Rellax(selector, options);

    const onScroll = () => {
      document.querySelectorAll(selector).forEach((element) => {
        if (
          element.getBoundingClientRect().top < window.innerHeight &&
          element.getBoundingClientRect().bottom > 0
        ) {
          if (!element.classList.contains("js-in-viewport")) {
            element.classList.add("js-in-viewport");
            rellax.refresh();
          }
        } else {
          element.classList.remove("js-in-viewport");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      rellax.destroy();
    });
  };

  initRellax("[data-rellax-y]", { vertical: true, horizontal: false });
  initRellax("[data-rellax-x]", { horizontal: true });

  return () => cleanups.forEach((fn) => fn());
}
