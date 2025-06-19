import { DataCiudadano } from "../ajax/data_ciudadanos.js";
import Swal from "sweetalert2";
import "../../css/styles.css";
import { Dom } from "../componentes/index_componentes.js";

export async function renderIndex() {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        iconColor: "white",
        customClass: {
            popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });

    const respuesta = await DataCiudadano.traerCiudadanos();

    console.log(respuesta);
    const tablaCiudadanos = document.querySelector("#tabla-ciudadanos");

    if (respuesta.success) {
        const datos = respuesta.data;

        const filas = datos.map((ciudadano) => {
            return Dom.crearFila(ciudadano);
        });

        tablaCiudadanos.replaceChildren(...filas);
    }

    const modal = document.querySelector("#modal-qr");
    modal.addEventListener("show.bs.modal", async (e) => {
        const boton = e.relatedTarget;
        const id = boton.id;

        console.log(id);

        const body = document.querySelector("#modal-body");
        const respuesta = await DataCiudadano.traerCiudadanoPorId(id);

        if (respuesta.success) {
            const ciudadano = respuesta.data;
            const img = document.createElement("img");
            img.src = "http://localhost:4000/public" + ciudadano["codigo"];

            body.replaceChildren(img);
        }
    });

    const campos = [
        "nombre",
        "apellidos",
        "apodo",
        "fecha_nacimiento",
        "planeta_origen",
        "planeta_residencia",
        "estado",
    ];

    const formulario = document.querySelector("#formulario-crud");

    const botonConfirmar = document.querySelector("#btn-confirmar");

    const modalCrud = document.querySelector("#modal-crud");
    modalCrud.addEventListener("show.bs.modal", async (e) => {
        const boton = e.relatedTarget;
        const id = boton.id;
        formulario.setAttribute("id_ciudadano", id);

        if (boton.classList.contains("editar-ciudadano")) {
            const respuesta = await DataCiudadano.traerCiudadanoPorId(id);
            console.log(respuesta);

            const ciudadano = respuesta.data;

            campos.forEach((campo) => {
                formulario.querySelector(`[name=${campo}]`).value =
                    ciudadano[campo];
            });

            botonConfirmar.classList.replace(
                "crear-ciudadano",
                "editar-ciudadano",
            );

            // TODO: Arreglar el render de la fecha
        } else {
            if (botonConfirmar.classList.contains("editar-ciudadano")) {
                botonConfirmar.classList.replace(
                    "crear-ciudadano",
                    "editar-ciudadano",
                );
            }
        }
    });

    modalCrud.addEventListener("hide.bs.modal", () => {
        campos.forEach((campo) => {
            formulario.querySelector(`[name=${campo}]`).value = "";
        });
    });

    modalCrud.addEventListener("hidden.bs.modal", () => {
        if (botonConfirmar.classList.contains("editar-ciudadano")) {
            botonConfirmar.classList.replace(
                "editar-ciudadano",
                "crear-ciudadano",
            );
        }
    });

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const boton = e.submitter;
        console.log(boton);

        const inputsCiudadanos = {};

        if (boton.classList.contains("crear-ciudadano")) {
            campos.forEach((campo) => {
                inputsCiudadanos[campo] = e.target.querySelector(
                    `[name=${campo}]`,
                ).value;
            });

            console.log(inputsCiudadanos);

            const respuesta =
                await DataCiudadano.insertarCiudadano(inputsCiudadanos);

            if (respuesta.success) {
                Toast.fire({
                    icon: "success",
                    title: "Ciudadano creado con exito",
                });
            } else {
                console.log(respuesta);
            }
        } else if (boton.classList.contains("editar-ciudadano")) {
            const id = formulario.getAttribute("id_ciudadano");

            campos.forEach((campo) => {
                inputsCiudadanos[campo] = formulario.querySelector(
                    `[name=${campo}]`,
                ).value;
            });

            const respuesta = await DataCiudadano.actualizarCiudadano(
                id,
                inputsCiudadanos,
            );

            console.log(respuesta);
        }
    });
}
