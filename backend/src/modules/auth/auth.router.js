import express from "express";
import { authUsuario } from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", authUsuario);

export default authRouter;
