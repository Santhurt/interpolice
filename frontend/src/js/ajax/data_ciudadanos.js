const url = "http://localhost:4000/ciudadanos";
export const DataCiudadano = {
    traerCiudadanos: async function () {
        try {
            const respuesta = await fetch(url);

            if (!respuesta.ok) {
                throw new Error("Error en la respuesta");
            }

            return respuesta.json();
        } catch (error) {
            console.error(error);
        }
    },

    traerCiudadanoPorId: async function (id) {
        try {
            const respuesta = await fetch(`${url}/${id}`);

            if (!respuesta.ok) {
                throw new Error("Error en la respuesta");
            }

            return respuesta.json();
        } catch (error) {
            console.error(error);
        }
    },

    insertarCiudadano: async function (ciudadano) {
        try {
            const respuesta = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(ciudadano),
            });

            if (!respuesta.ok) {
                throw new Error("Error en la respuesta");
            }

            return respuesta.json();
        } catch (error) {
            console.log(error);
        }
    },

    actualizarCiudadano: async function (id, ciudadano) {
        try {
            const respuesta = await fetch(`${url}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(ciudadano),
            });

            if (!respuesta.ok) {
                throw new Error("Error en la respuesta");
            }

            return respuesta.json();
        } catch (error) {
            console.log(error);
        }
    },
};
