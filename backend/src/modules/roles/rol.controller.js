import Rol from "./rol.model.js";

export async function crearRol(req, res) {
    try {
        const nuevoRol = await Rol.create(req.body);

        return res.status(200).json({
            success: true,
            data: nuevoRol,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function traerRoles(req, res) {
    try {
        const roles = await Rol.findAll();

        return res.status(200).json({
            success: true,
            data: roles,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function toggleRol(req, res) {
    try {
        const id = req.params.id;

        const [countRows] = await Rol.update({
            where: {
                id_planeta: id,
            },
        });

        if (countRows > 0) {
            return res.status(200).json({
                success: true,
            });
        } else {
            return res.status(400).json({
                success: false,
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
