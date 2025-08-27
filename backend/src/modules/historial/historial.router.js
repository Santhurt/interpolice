import express from "express";
import { registrarHitorial, traerHistoriales } from "./historial.controller.js";

const historialRouter = express.Router();

historialRouter.get("/historiales", traerHistoriales);
historialRouter.post("/historiales", registrarHitorial);

export default historialRouter;
