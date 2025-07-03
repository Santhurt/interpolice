import Ciudadano from "../models/ciudadano.js";
import express from "express";
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
        const resultado = await Ciudadano.findAll();

        res.send({
            success: true,
            data: resultado,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            data: `${error.code} ${error.message}`,
        });
    }
});

ciudadano.get("/ciudadanos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const ciudadanoEncontrado = await Ciudadano.findByPk(id);

        if (ciudadanoEncontrado) {
            res.send({
                success: true,
                data: respuesta[0],
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Ciudadano no encontrado.",
            });
        }
    } catch (error) {
        console.error("Error al obtener ciudadano por ID:", error);
        res.status(500).send({
            success: false,
            message: `Error: ${error.message}`,
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

        payload.codigo = qrRelativePath;
        payload.foto = qrRelativePath;

        const nuevoCiudadano = await Ciudadano.create(payload);
        res.status(201).send({
            success: true,
            data: nuevoCiudadano,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: `Error: ${error.message}`,
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

        const updateFields = Object.fromEntries(
            Object.entries(payload).filter(([_, value]) => value !== undefined),
        );

        const [filasActualizadas] = await Ciudadano.update(updateFields, {
            where: { id_ciudadano: id },
        });

        if (filasActualizadas > 0) {
            const ciudadanoActualizado = Ciudadano.findByPk(id);
            res.send({
                success: true,
                data: ciudadanoActualizado,
            });
        }
    } catch (error) {
        res.status(400).send({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
});

ciudadano.delete("/ciudadanos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const estadoNuevo = req.body.estado;

        if (!estadoNuevo) {
            return res.status(400).send({
                success: false,
                message:
                    "Se requiere el campo 'estado' en el cuerpo de la solicitud para la eliminación lógica.",
            });
        }

        const [filasActualizadas] = await Ciudadano.update(
            { estado: estadoNuevo },
            { where: { id_ciudadano: id } },
        );

        if (filasActualizadas > 0) {
            res.status(200).send({
                // 200 OK para una actualización exitosa
                success: true,
                message: `Estado del ciudadano ${id} actualizado a '${estadoNuevo}'.`,
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Ciudadano no encontrado o estado no actualizado.",
            });
        }
    } catch (error) {
        console.error("Error al cambiar estado del ciudadano:", error);
        res.status(500).send({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
});

export default ciudadano;
