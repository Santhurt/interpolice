import path from "path";
import QRCode from "qrcode";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta para guardar los qrs
const qrCodesDir = path.join(__dirname, "../../../public/qrcodes/");

export async function procesarQR(data) {
    try {
        if (!fs.existsSync(qrCodesDir)) {
            fs.mkdirSync(qrCodesDir, { recursive: true });
        }

        const QRContent = JSON.stringify(data);

        // Nombre del archivo
        const timestamp = Date.now();
        const randomSuffix = Math.floor(Math.random() * 100000);
        const qrFileName = `ciudadano-${timestamp}-${randomSuffix}.png`;

        const qrFilePath = path.join(qrCodesDir, qrFileName);
        const qrRelativePath = `/qrcode/${qrFileName}`;

        await QRCode.toFile(qrFilePath, QRContent, {
            errorCorrectionLevel: "H",
        });

        return qrRelativePath;
    } catch (error) {
        console.error("Error en generateAndSaveQR:", error);
        // Relanzar el error para que pueda ser capturado por la función que llama.
        throw new Error("Fallo al generar y guardar el código QR.");
    }
}
