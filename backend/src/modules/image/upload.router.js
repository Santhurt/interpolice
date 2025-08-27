import express from "express";
import upload from "./upload.config";
import { subirImagen } from "./upload.controller";

const uploadRouter = express.Router();

uploadRouter.post("/image/:id", upload.single("image"), subirImagen);

export default uploadRouter;
