import express from "express";
import ciudadano from "./src/ciudadano.js";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Instanciamos la libreria express en la constante app
// Heredamos todos los metodos de express
const app = express();
app.use(express.json());
app.use(cors());

// configuracion para la imagen
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicPath = path.join(__dirname, "public");
app.use("/public", express.static(publicPath));

app.use("/", ciudadano);

const puerto = 4000;
app.listen(puerto, () => {
    console.log(`Api ejecutandose en el puerto: ${puerto}`);
});
