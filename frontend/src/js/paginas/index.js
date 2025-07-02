import { DataCiudadano } from "../ajax/data_ciudadanos.js";
import Swal from "sweetalert2";
import "../../css/styles.css";
import { Dom } from "../componentes/index_componentes.js";
import * as bootstrap from "bootstrap";

export async function renderIndex() {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        iconColor: "white",
        customClass: { popup: "colored-toast" },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });

    // --- Selectores del DOM ---
    const tablaCiudadanos = document.querySelector("#tabla-ciudadanos");
    const modalQr = document.querySelector("#modal-qr");
    const modalCrud = document.querySelector("#modal-crud");
    const formulario = document.querySelector("#formulario-crud");
    const botonConfirmar = document.querySelector("#btn-confirmar");
    const modalQrBody = document.querySelector("#modal-body");

    const campos = [
        "nombre",
        "apellidos",
        "apodo",
        "fecha_nacimiento",
        "planeta_origen",
        "planeta_residencia",
        "estado",
    ];
    let ciudadanosDatos = [];

    // --- Funciones auxiliares ---
    const cargarYRenderizarCiudadanos = async () => {
        const respuesta = await DataCiudadano.traerCiudadanos();
        if (respuesta.success) {
            ciudadanosDatos = respuesta.data;
            const filas = ciudadanosDatos.map(Dom.crearFila);
            tablaCiudadanos.replaceChildren(...filas);
        } else {
            console.error("Error al cargar los ciudadanos:", respuesta);
        }
    };

    const formatearFechaParaInput = (fechaString) => {
        if (!fechaString) return "";
        // Asegura que la fecha se interprete correctamente sin problemas de zona horaria
        const fecha = new Date(fechaString);
        const anio = fecha.getUTCFullYear();
        const mes = String(fecha.getUTCMonth() + 1).padStart(2, "0");
        const dia = String(fecha.getUTCDate()).padStart(2, "0");
        return `${anio}-${mes}-${dia}`;
    };

    // --- Event Listeners ---
    modalQr.addEventListener("show.bs.modal", async (e) => {
        const id = e.relatedTarget.id;
        const respuesta = await DataCiudadano.traerCiudadanoPorId(id);

        if (respuesta.success) {
            const ciudadano = respuesta.data;
            const img = document.createElement("img");
            img.src = `http://localhost:4000/public${ciudadano.codigo}`;
            modalQrBody.replaceChildren(img);
        }
    });

    modalCrud.addEventListener("show.bs.modal", async (e) => {
        const boton = e.relatedTarget;
        const id = boton.id;
        const esEdicion = boton.classList.contains("editar-ciudadano");

        formulario.setAttribute("data-id-ciudadano", id || "");
        botonConfirmar.classList.toggle("editar-ciudadano", esEdicion);
        botonConfirmar.classList.toggle("crear-ciudadano", !esEdicion);

        if (esEdicion) {
            const ciudadano = ciudadanosDatos.find((c) => c.id_ciudadano == id);
            if (!ciudadano) return;

            campos.forEach((campo) => {
                const input = formulario.querySelector(`[name=${campo}]`);
                if (campo === "fecha_nacimiento") {
                    input.value = formatearFechaParaInput(ciudadano[campo]);
                } else {
                    input.value = ciudadano[campo] || "";
                }
            });
        }
    });

    modalCrud.addEventListener("hide.bs.modal", () => {
        formulario.removeAttribute("data-id-ciudadano");
        botonConfirmar.classList.replace("editar-ciudadano", "crear-ciudadano");
    });

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const esEdicion = e.submitter.classList.contains("editar-ciudadano");
        const id = formulario.getAttribute("data-id-ciudadano");
        const formData = new FormData(formulario);

        const data = Object.fromEntries(formData);
        console.log(formData);
        console.log(data);
        const respuesta = esEdicion
            ? await DataCiudadano.actualizarCiudadano(id, data)
            : await DataCiudadano.insertarCiudadano(data);

        if (respuesta.success) {
            Toast.fire({
                icon: "success",
                title: `Ciudadano ${esEdicion ? "actualizado" : "creado"} con éxito`,
            });
            bootstrap.Modal.getInstance(modalCrud).hide();
            formulario.reset();
            await cargarYRenderizarCiudadanos();
        } else {
            Toast.fire({
                icon: "error",
                title: `Error: ${respuesta.message || "No se pudo completar la operación"}`,
            });
            console.error(respuesta);
        }
    });

    // --- Carga inicial ---
    await cargarYRenderizarCiudadanos();
}
