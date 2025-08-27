import express from "express";
import {
    actualizarDelito,
    traerDelitos,
    crearDelito,
    eliminarDelito,
    traerDelitoPorId,
} from "./delitos.controller.js";

const delitoRouter = express.Router();

delitoRouter.post("/delitos", crearDelito);
delitoRouter.get("/delitos", traerDelitos);
delitoRouter.get("/delitos/:id", traerDelitoPorId);
delitoRouter.put("/delitos/:id", actualizarDelito);
delitoRouter.delete("/delitos/:id", eliminarDelito);

export default delitoRouter;
