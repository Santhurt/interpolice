import express from "express";
import {
    actualizarPlaneta,
    crearPlaneta,
    traerPlanetaPorId,
    traerPlanetas,
} from "./planeta.controller.js";

const planetaRouter = express.Router();

planetaRouter.get("/planetas", traerPlanetas);
planetaRouter.get("/planetas/:id", traerPlanetaPorId);
planetaRouter.post("/planetas", crearPlaneta);
planetaRouter.put("/planetas/:id", actualizarPlaneta);

export default planetaRouter;
