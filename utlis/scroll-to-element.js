export const scrollToElement = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    if (
      anchor.href &&
      anchor.href != "#" &&
      !anchor.hasAttribute("data-bs-toggle")
    ) {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const id = anchor.href.split("#")[1];
        const element = document.getElementById(id);
        if (element) {
          const yOffset = +70; // Adjust this offset as per your layout
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      });
    }
  });
};
