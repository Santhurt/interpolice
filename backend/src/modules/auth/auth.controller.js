import { crearToken } from "../helpers/token.helper.js";
import { verificarUsuario } from "./auth.verify.js";

export async function authUsuario(req, res) {
    try {
        const resultado = await verificarUsuario(req.body);
        const token = crearToken(resultado);

        return res.status(200).json({
            success: true,
            data: {
                correo: resultado.correo,
                token: token,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
