import express from "express";
import {
    actualizarUsuario,
    crearUsuario,
    toggleUsuario,
    traerUsuarios,
} from "./usuario.controller.js";

const usuarioRouter = express.Router();

usuarioRouter.post("/usuarios", crearUsuario);
usuarioRouter.get("/usuarios", traerUsuarios);
usuarioRouter.get("/usuarios/:id", traerUsuarios);
usuarioRouter.put("/usuarios/:id", actualizarUsuario);
usuarioRouter.delete("/usuarios/:id", toggleUsuario);

export default usuarioRouter;
