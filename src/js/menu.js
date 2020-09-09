const nav = document.getElementById("nav");
const btnMenu = document.getElementById("btn-nav");

if (btnMenu && nav) {
  btnMenu.addEventListener("click", (e) => {
    nav.classList.toggle("header__nav--show");
  });
  nav.addEventListener("click", (e) => {
    if (e.target.className == "main-menu__link") {
      nav.classList.remove("header__nav--show");
    }
  });
}
