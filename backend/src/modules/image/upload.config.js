import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { existsSync, mkdirSync } from "fs";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        const uploadDir = join(__dirname, "../uploads/ciudadano/");

        if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filaname: (req, fila, cb) => {
        const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}`;
        const extension = extname(file.originalName);
        cb(null, `ciudadano-${uniqueSuffix}${extension}`);
    },
});

const extensiones = ["image/jpg", "image/jpeg", "image/png"];

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5,
    },
    fileFilter: (req, file, cb) => {
        if (extensiones.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Tipo de archivo no permitido"), false);
        }
    },
});

export default upload;
