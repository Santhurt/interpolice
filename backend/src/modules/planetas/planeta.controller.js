import Planeta from "./planeta.model.js";

export async function traerPlanetas(req, res) {
    try {
        const planetas = await Planeta.findAll();
        return res.status(200).json({
            success: true,
            data: planetas,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function crearPlaneta(req, res) {
    try {
        const nuevoPlaneta = await Planeta.create(req.body);

        return res.status(200).json({
            success: true,
            data: nuevoPlaneta,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
