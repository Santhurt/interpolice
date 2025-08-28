import bcrypt from "bcrypt";
import Usuario from "./usuario.model.js";
import { UniqueConstraintError } from "sequelize";

export async function crearUsuario(req, res) {
    let errorCode;
    try {
        const data = req.body;

        if (!data.password) {
            errorCode = 400;
            throw new Error("No se encontro la contraseña");
        }

        data.password = bcrypt.hashSync(data.password, 10);

        const nuevoUsuario = (await Usuario.create(data)).get({ plain: true });
        delete nuevoUsuario.password;

        return res.status(200).json({
            success: true,
            data: nuevoUsuario,
        });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            if (error.fields.correo) {
                return res.status(409).json({
                    success: false,
                    message: "El correo ya esta registrado",
                });
            } else {
                return res.status(409).json({
                    success: false,
                    message: "El numero de documento ya esta registrado",
                });
            }
        }
        console.log(error);
        return res.status(errorCode || 500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function traerPorId(req, res) {
    try {
        const id = req.params.id;

        const usuario = await Usuario.findByPk(id);

        return res.status(200).json({
            success: true,
            data: usuario,
        });
    } catch (error) {
        console.log(error);
        return res.status(errorCode || 500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function traerUsuarios(req, res) {
    try {
        const usuarios = await Usuario.findAll();

        return res.status(200).json({
            success: true,
            data: usuarios,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function actualizarUsuario(req, res) {
    try {
        const id = req.params.id;

        if (req.body.password) {
            delete req.body.password;
        }

        const filas = await Usuario.update(req.body, {
            where: {
                documento: id,
            },
        });

        if (filas > 0) {
            return res.status(200).json({
                success: true,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "No actualizo ninguna fila",
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

export async function toggleUsuario(req, res) {
    try {
        const id = req.params.id;

        const usuario = await Usuario.findOne({
            where: { documento: id },
            paranoid: false,
        });

        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        if (usuario.isSoftDeleted()) {
            await usuario.restore();
            return res.status(200).json({
                success: true,
                action: "restored",
            });
        } else {
            await usuario.destroy();
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
