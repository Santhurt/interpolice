import express from "express";
import {
    actualizarCiudadano,
    actualizarEstado,
    crearCiudadano,
    traerCiudadanoPorId,
    traerCiudadanos,
} from "./ciudadano.controller.js";

const ciudadanoRouter = express.Router();

ciudadanoRouter.get("/ciudadanos", traerCiudadanos);
ciudadanoRouter.get("/ciudadanos/:id", traerCiudadanoPorId);
ciudadanoRouter.post("/ciudadanos", crearCiudadano);
ciudadanoRouter.put("/ciudadanos/:id", actualizarCiudadano);
ciudadanoRouter.delete("/ciudadanos/:id", actualizarEstado);

export default ciudadanoRouter;
