import express from "express";
import {
    registrarHitorial,
    traerHistoriales,
    traerHistorialCiudadano,
    actualizarHistorialCiudadano,
} from "./historial.controller.js";

const historialRouter = express.Router();

historialRouter.get("/historiales", traerHistoriales);
historialRouter.get("/historiales/:id", traerHistorialCiudadano);
historialRouter.post("/historiales", registrarHitorial);
historialRouter.put("/historiales/:id", actualizarHistorialCiudadano);

export default historialRouter;
