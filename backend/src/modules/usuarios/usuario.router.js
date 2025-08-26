import express from "express";
import { crearUsuario } from "./usuario.controller.js";

const usuarioRouter = express.Router();

usuarioRouter.post("/usuarios", crearUsuario);

export default usuarioRouter;
