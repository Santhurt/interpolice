import express from "express";
import { crearUsuario, traerUsuarios } from "./usuario.controller.js";

const usuarioRouter = express.Router();

usuarioRouter.post("/usuarios", crearUsuario);
usuarioRouter.get("/usuarios", traerUsuarios);

export default usuarioRouter;
