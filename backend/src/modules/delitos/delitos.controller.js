import Delito from "./delitos.model.js";

export async function crearDelito(req, res) {
    try {
        const nuevoDelito = await Delito.create(req.body);

        return res.status(200).json({
            success: true,
            data: nuevoDelito,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function traerDelitos(req, res) {
    try {
        const delitos = await Delito.findAll();

        return res.status(200).json({
            success: true,
            data: delitos,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function traerDelitoPorId(req, res) {
    try {
        const id = req.params.id;
        const delito = await Delito.findByPk(id);

        return res.status(200).json({
            success: true,
            data: delito,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function actualizarDelito(req, res) {
    try {
        const id = req.params.id;
        const filas = await Delito.update(req.body, {
            where: {
                id_delito: id,
            },
        });

        if (filas > 0) {
            return res.status(200).json({
                success: true,
            });
        } else {
            return res.status(200).json({
                success: false,
                message: "No se actualizaron delitos",
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

export async function eliminarDelito(req, res) {
    try {
        const id = req.params.id;
        const filas = await Delito.destroy(id);

        if (filas > 0) {
            return res.status(200).json({
                success: true,
            });
        } else {
            return res.status(200).json({
                success: false,
                message: "No se eliminaron delitos",
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
