import express from "express";
import {
    actualizarUsuario,
    crearUsuario,
    toggleUsuario,
    traerPorId,
    traerUsuarios,
} from "./usuario.controller.js";
import { autorizarRuta } from "../middleware/auth.middleware.js";

const usuarioRouter = express.Router();

usuarioRouter.post("/usuarios", crearUsuario);
usuarioRouter.get("/usuarios", autorizarRuta, traerUsuarios);
usuarioRouter.get("/usuarios/:id", autorizarRuta, traerPorId);
usuarioRouter.put("/usuarios/:id", autorizarRuta, actualizarUsuario);
usuarioRouter.delete("/usuarios/:id", autorizarRuta, toggleUsuario);

export default usuarioRouter;
