import express from "express";
import {
    actualizarCiudadano,
    actualizarEstado,
    crearCiudadano,
    traerCiudadanoPorId,
    traerCiudadanos,
} from "./ciudadano.controller.js";
import { autorizarRuta } from "../middleware/auth.middleware.js";

const ciudadanoRouter = express.Router();

ciudadanoRouter.use(autorizarRuta)

ciudadanoRouter.get("/ciudadanos", traerCiudadanos);
ciudadanoRouter.get("/ciudadanos/:id", traerCiudadanoPorId);
ciudadanoRouter.post("/ciudadanos", crearCiudadano);
ciudadanoRouter.put("/ciudadanos/:id", actualizarCiudadano);
ciudadanoRouter.delete("/ciudadanos/:id", actualizarEstado);

export default ciudadanoRouter;
