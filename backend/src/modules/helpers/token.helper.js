import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export function crearToken(payload) {
    return jwt.sign(payload, process.env.SECRET, {
        expiresIn: "1h",
    });
}

export function verificarToken(token) {
    return jwt.verify(token, process.env.SECRET);
}
