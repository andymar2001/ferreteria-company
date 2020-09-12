const formQuote = document.getElementById("form-quote");
const divDni = document.getElementById("div-dni");
const nroDocument = document.getElementById("number-document");
if (formQuote) {
  formQuote.typeDocument.addEventListener("click", (e) => {
    if (e.target.value == "dni") {
      divDni.style.display = "grid";
      formQuote.businessName.parentElement.style.display = "none";
      nroDocument.previousElementSibling.textContent = "Nro. de DNI *";
      nroDocument.setAttribute("name", "nroDni");
    } else if (e.target.value == "ruc") {
      divDni.removeAttribute("style");
      formQuote.businessName.parentElement.removeAttribute("style");
      nroDocument.previousElementSibling.textContent = "Nro. de RUC *";
      nroDocument.setAttribute("name", "nroRuc");
    }
  });
}
