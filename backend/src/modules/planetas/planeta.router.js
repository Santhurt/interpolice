import express from "express";
import { crearPlaneta, traerPlanetas } from "./planeta.controller.js";

const planetaRouter = express.Router();

planetaRouter.get("/planetas", traerPlanetas);
planetaRouter.post("/planetas", crearPlaneta);

export default planetaRouter;
