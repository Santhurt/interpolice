import { procesarQR } from "../helpers/qr.js";
import Ciudadano from "./ciudadano.model.js";

export async function traerCiudadanos(req, res) {
    try {
        const ciudadanos = await Ciudadano.findAll();
        return res.status(200).json({
            success: true,
            data: ciudadanos,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function traerCiudadanoPorId(req, res) {
    try {
        const id = req.params.id;
        const ciudadano = await Ciudadano.findByPk(id);

        console.log(`Ciudadano encontrado:  ${ciudadano}`);

        if (ciudadano) {
            return res.status(200).json({
                success: true,
                data: ciudadano,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Ciudadano no encontrado",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function crearCiudadano(req, res) {
    try {
        const nuevoCiudadano = req.body;
        const qrRelativePath = await procesarQR(nuevoCiudadano);

        nuevoCiudadano.codigo = qrRelativePath;

        const respuesta = await Ciudadano.create(nuevoCiudadano);

        return res.status(200).json({
            success: true,
            data: respuesta,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function actualizarCiudadano(req, res) {
    try {
        const id = req.params.id;
        const nuevoCiudadano = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "No se encontro la id",
            });
        }

        const qrRelativePath = await procesarQR(nuevoCiudadano);
        nuevoCiudadano.codigo = qrRelativePath;

        const [respuesta] = await Ciudadano.update(nuevoCiudadano, {
            where: {
                id_ciudadano: id,
            },
        });

        if (respuesta > 0) {
            const ciudadanoActualizado = await Ciudadano.findByPk(id);
            return res.status(200).json({
                success: true,
                data: ciudadanoActualizado,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function actualizarEstado(req, res) {
    try {
        const id = req.params.id;
        const estado = req.body.estado;

        if (!estado) {
            return res.status(404).json({
                success: false,
                message: "Se requiere el campo estado",
            });
        }

        const [filasActualizadas] = await Ciudadano.update(
            { estado: estado },
            { where: { id_ciudadano: id } },
        );

        if (filasActualizadas > 0) {
            return res.status(200).json({
                success: true,
                message: "Estado actualizado",
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Ciudadano no encontrado",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
