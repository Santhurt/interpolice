import express from "express";
import {
    actualizarPlaneta,
    crearPlaneta,
    eliminarPlaneta,
    traerPlanetaPorId,
    traerPlanetas,
} from "./planeta.controller.js";

const planetaRouter = express.Router();

planetaRouter.get("/planetas", traerPlanetas);
planetaRouter.get("/planetas/:id", traerPlanetaPorId);
planetaRouter.post("/planetas", crearPlaneta);
planetaRouter.put("/planetas/:id", actualizarPlaneta);
planetaRouter.delete("/planetas/:id", eliminarPlaneta);

export default planetaRouter;
