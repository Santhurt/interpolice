import bcrypt from "bcrypt";
import Usuario from "./usuario.model.js";
export async function crearUsuario(req, res) {
    let errorCode;
    try {
        const data = req.body;

        if (data.password === null) {
            errorCode = 400;
            throw new Error("No se encontro la contraseña");
        }

        data.password = bcrypt.hashSync(data.password, 10);

        const nuevoUsuario = await Usuario.create(data);

        return res.status(200).json({
            success: true,
            data: nuevoUsuario,
        });
    } catch (error) {
        console.log(error);
        return res.status(errorCode || 500).json({
            success: false,
            message: error.message,
        });
    }
}
