import { verificarToken } from "../helpers/token.helper.js";

export async function autorizarRuta(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token no encontrado",
        });
    }

    const decoded = verificarToken(token);

    if (!decoded) {
        return res.status(401).json({
            success: false,
            message: "Token invalido",
        });
    }

    next();
}
