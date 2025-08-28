import Ciudadano from "../ciudadano/ciudadano.model.js";
import Delito from "../delitos/delitos.model.js";
import Historial from "./historial.model.js";

export async function registrarHitorial(req, res) {
    try {
        const [ciudadano, delito] = await Promise.all([
            Ciudadano.findByPk(req.body.id_ciudadano),
            Delito.findByPk(req.body.id_delito),
        ]);

        if (!ciudadano || !delito) {
            return res.status(400).json({
                success: false,
                message: "No se encontro el ciudadano o el delito a registrar",
            });
        }

        const nuevoHistorial = await Historial.create(req.body);

        return res.status(200).json({
            success: true,
            data: nuevoHistorial,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
export async function traerHistoriales(req, res) {
    try {
        const hitoriales = await Historial.findAll();

        return res.status(200).json({
            success: true,
            data: hitoriales,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
export async function traerHistorialCiudadano(req, res) {
    try {
        const idCiudadano = req.params.id;

        const ciudadano = await Ciudadano.findByPk(idCiudadano);

        if (!ciudadano) {
            return res.status(400).json({
                success: false,
                message: "No se encontró el ciudadano a consultar",
            });
        }
        const hitoriales = await Historial.findAll({
            where: {
                id_ciudadano: idCiudadano,
            },
        });

        return res.status(200).json({
            success: true,
            data: hitoriales,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function actualizarHistorialCiudadano(req, res) {
    try {
        const idCiudadano = req.params.id;
        const filas = await Historial.update(req.body, {
            where: { id_ciudadano: idCiudadano, id_delito: req.body.id_delito },
        });

        if (filas > 0) {
            return res.status(200).json({
                success: true,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "No se actualizo ningun historial",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
