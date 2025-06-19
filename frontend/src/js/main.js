// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap’s JS
import * as bootstrap from "bootstrap";

document.addEventListener("DOMContentLoaded", () => {
    const pagina = window.location.pathname;

    console.log(window.location.origin);

    if (pagina.includes("/") || pagina.includes("index.html")) {
        import("./paginas/index.js").then((modulo) => {
            modulo.renderIndex();
        });
    }
});
