const btnNav = document.getElementById("btn-nav");
const nav = document.getElementById("nav");

btnNav.addEventListener("click", (e) => {
  nav.classList.toggle("header__nav--show");
});
nav.addEventListener("click", (e) => {
  if (e.target.id == "nav" || e.target.className == "main-menu__link") {
    nav.classList.remove("header__nav--show");
  }
});
