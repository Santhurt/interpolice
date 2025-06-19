import express from "express";
import connection from "./db_modules.js";
import QRCode from "qrcode";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Emular __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ciudadano = express.Router();

const qrCodesDir = path.join(__dirname, "../public/qrcodes");
if (!fs.existsSync(qrCodesDir)) {
    fs.mkdirSync(qrCodesDir, { recursive: true });
}

ciudadano.get("/ciudadanos", async (req, res) => {
    try {
        const consulta = "select * from ciudadanos;";
        const [resultado] = await connection.query(consulta);

        res.send({
            status: 200,
            data: resultado,
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            data: `${error.code} ${error.message}`,
        });
    }
});

ciudadano.get("/ciudadanos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const consulta = "select * from ciudadanos where id_ciudadano = ?";

        const [respuesta] = await connection.query(consulta, [id]);

        res.send({
            success: true,
            data: respuesta[0],
        });
    } catch (error) {
        res.send({
            success: false,
            message: `${error.code} ${error.message}`,
        });
    }
});

ciudadano.post("/ciudadanos/", async (req, res) => {
    try {
        const payload = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            apodo: req.body.apodo,
            fecha_nacimiento: req.body.fecha_nacimiento,
            planeta_origen: req.body.planeta_origen,
            planeta_residencia: req.body.planeta_residencia,
            estado: req.body.estado,
        };
        const qrContent = JSON.stringify(payload);

        const timestamp = Date.now();
        const randomSuffix = Math.floor(Math.random() * 100000);

        const qrFileName = `ciudadano-${timestamp}-${randomSuffix}.png`;
        const qrFilePath = path.join(qrCodesDir, qrFileName);
        const qrRelativePath = `/qrcodes/${qrFileName}`;

        payload["codigo"] = qrRelativePath;

        await QRCode.toFile(qrFilePath, qrContent, {
            errorCorrectionLevel: "H",
        });

        payload["foto"] = qrRelativePath;

        const consulta = "insert into ciudadanos set ?";
        const [respuesta] = await connection.query(consulta, payload);

        const nuevoId = respuesta.insertId;

        const [nuevoCiudadano] = await connection.query(
            "select * from ciudadanos where id_ciudadano = ?",
            [nuevoId],
        );

        res.send({
            success: true,
            data: nuevoCiudadano[0],
        });
    } catch (error) {
        res.send({
            success: false,
            message: `${error.code} ${error.message}`,
        });
    }
});

ciudadano.put("/ciudadanos/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const payload = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            apodo: req.body.apodo,
            fecha_nacimiento: req.body.fecha_nacimiento,
            planeta_origen: req.body.planeta_origen,
            planeta_residencia: req.body.planeta_residencia,
            foto: req.body.foto,
            codigo: req.body.codigo,
            estado: req.body.estado,
        };

        const consulta = "update ciudadanos set ? where id_ciudadano = ?";

        const [respuesta] = await connection.query(consulta, [payload, id]);

        res.send({
            success: true,
            data: respuesta,
        });
    } catch (error) {
        res.send({
            success: false,
            message: `${error.code} ${error.message}`,
        });
    }
});

ciudadano.delete("/ciudadanos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const payload = {
            estado: req.body.estado,
        };

        const consulta =
            "update ciudadanos set estado = ? where id_ciudadano = ?";

        const [respuesta] = await connection.query(consulta, [
            payload.estado,
            id,
        ]);

        res.send({
            success: true,
            data: respuesta,
        });
    } catch (error) {
        res.send({
            success: false,
            message: `${error.code} ${error.message}`,
        });
    }
});

export default ciudadano;
