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

        const rol = await Rol.findOne({
            where: {
                id_rol: id,
            },

            paranoid: false,
        });

        if (!rol) {
            throw new Error("Rol no encontrado");
        }

        if (rol.isSoftDeleted()) {
            await rol.restore();
            return res.status(200).json({
                success: true,
                action: "restored",
            });
        } else {
            await rol.destroy();
            return res.status(200).json({
                success: true,
                action: "deleted",
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
