import express from "express";
import upload from "./upload.config.js";
import { subirImagen } from "./upload.controller.js";

const uploadRouter = express.Router();

uploadRouter.post("/image/:id", upload.single("image"), subirImagen);

export default uploadRouter;
