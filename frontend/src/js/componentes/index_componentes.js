export const Dom = {
    getDatosFormulario: function(formulario) {
        const datos = {};
        const formData = new FormData(formulario);
        
        for(const [key, value] of formData.entries()) {
            datos[key] = value;
        }

        return datos;
    },
    crearFila: function (ciudadano) {
        if ("foto" in ciudadano) {
            delete ciudadano["foto"];
        }
        const tr = document.createElement("tr");

        const tds = Object.keys(ciudadano).map((key) => {
            const td = document.createElement("td");

            if (key === "codigo") {
                const botonQR = document.createElement("button");
                botonQR.className = "btn btn-primary";
                botonQR.textContent = "Mostrar QR";
                botonQR.id = ciudadano["id_ciudadano"];

                botonQR.setAttribute("data-bs-toggle", "modal");
                botonQR.setAttribute("data-bs-target", "#modal-qr");
                td.appendChild(botonQR);
            } else {
                td.textContent = ciudadano[key];
            }

            return td;
        });

        const tdAcciones = document.createElement("td");
        tdAcciones.className = "d-flex gap-2";

        const botonEditar = document.createElement("button");
        botonEditar.className = "btn btn-warning editar-ciudadano";
        botonEditar.textContent = "Editar";
        botonEditar.setAttribute("data-bs-toggle", "modal");
        botonEditar.setAttribute("data-bs-target", "#modal-crud");
        botonEditar.id = ciudadano["id_ciudadano"];

        const botonEliminar = document.createElement("button");
        botonEliminar.className = "btn btn-danger";
        botonEliminar.textContent = "Eliminar";

        tdAcciones.replaceChildren(botonEditar, botonEliminar);

        tds.push(tdAcciones);

        tr.replaceChildren(...tds);

        return tr;
    },
};
