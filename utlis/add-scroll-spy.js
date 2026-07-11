const addScrollspy = (
  defalutClass = "",
  linksContainer = ".scrollspy-link",
  activeClass = "active"
) => {
  var section = document.querySelectorAll(".scrollSpysection");

  var sections = {};
  var i = 0;

  Array.prototype.forEach.call(section, function (e) {
    sections[e.id] = e.offsetTop;
  });
  var scrollPosition =
    document.documentElement.scrollTop || document.body.scrollTop;

  for (i in sections) {
    if (sections[i] <= scrollPosition) {
      document
        .querySelector(linksContainer + ` .${activeClass}`)
        ?.setAttribute("class", defalutClass);
      const navLink = document.querySelector(
        linksContainer + " a[href*=" + i + "]"
      );

      navLink?.setAttribute("class", `${defalutClass} ${activeClass}`);
    }
  }
};
export default addScrollspy;
