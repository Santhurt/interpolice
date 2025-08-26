import express from "express";
import { crearRol, toggleRol, traerRoles } from "./rol.controller.js";

const rolRouter = express.Router();

rolRouter.get("/roles", traerRoles);
rolRouter.post("/roles", crearRol);
rolRouter.put("/roles/:id", toggleRol);

export default rolRouter;
