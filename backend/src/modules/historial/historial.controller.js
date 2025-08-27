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
