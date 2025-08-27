import Historial from "./historial.model.js";

export async function registrarHitorial(req, res) {
    try {
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
            where: { id_ciudadano: idCiudadano },
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
