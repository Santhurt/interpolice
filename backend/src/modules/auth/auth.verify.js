import Usuario from "../usuarios/usuario.model.js";
import bcrypt from "bcrypt";

export async function verificarUsuario(data) {
    const { correo, password } = data;

    const usuario = await Usuario.findOne({
        where: {
            correo: correo,
        },
        attributes: { include: ["password"] },
        paranoid: false,
    });

    if (!usuario) {
        throw new Error("No se encontró el usuario");
    }

    console.log(usuario);
    console.log(usuario.get("password"));

    const coinciden = bcrypt.compareSync(password, usuario.get("password"));

    if (!coinciden) {
        throw new Error("Error en los datos");
    }

    return { correo: correo };
}
