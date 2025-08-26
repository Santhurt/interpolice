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

export async function traerPlanetaPorId(req, res) {
    try {
        const id = req.params.id;
        const planeta = await Planeta.findByPk(id);

        if (planeta) {
            return res.status(200).json({
                success: true,
                data: planeta,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "No se encontro el planeta",
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

export async function actualizarPlaneta(req, res) {
    try {
        const id = req.params.id;
        const [rowCount] = await Planeta.update(req.body, {
            where: {
                id_planeta: id,
            },
        });

        if (rowCount > 0) {
            return res.status(200).json({
                success: true,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "No se actualizo ningun registro",
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

export async function eliminarPlaneta(req, res) {
    try {
        const id = req.params.id;
        const rowCount = await Planeta.destroy({
            where: {
                id_planeta: id,
            },
        });

        if (rowCount > 0) {
            return res.status(200).json({
                success: true,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "No se elimino ningun registro",
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
