import express from "express";
import cors from "cors";
import path from "path";
import sequelize from "./config/database.js";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

import "./modules/relations/ciudadano_planeta.js";
import "./modules/relations/rol_usuario.js";
import "./modules/relations/historial_ciudadano.js";

import ciudadanoRouter from "./modules/ciudadano/ciudadano.router.js";
import planetaRouter from "./modules/planetas/planeta.router.js";
import rolRouter from "./modules/roles/rol.router.js";
import usuarioRouter from "./modules/usuarios/usuario.router.js";
import delitoRouter from "./modules/delitos/delito.router.js";
import authRouter from "./modules/auth/auth.router.js";
import historialRouter from "./modules/historial/historial.router.js";

config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicPath = path.join(__dirname, "public");
app.use("/public", express.static(publicPath));

app.use("/api", authRouter);
app.use("/api", ciudadanoRouter);
app.use("/api", planetaRouter);
app.use("/api", rolRouter);
app.use("/api", usuarioRouter);
app.use("/api", delitoRouter);
app.use("/api", historialRouter);

const puerto = process.env.PORT || 4000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log(
            "Conexión a la base de datos MySQL establecida correctamente con Sequelize.",
        );

        // Sincronizar todos los modelos definidos con la base de datos.
        // Opciones:
        // - `force: true`: Elimina la tabla si existe y la recrea (¡PELIGROSO en producción!).
        // - `alter: true`: Realiza cambios en la tabla existente para que coincida con el modelo (más seguro para desarrollo).
        // - `false` (por defecto): No hace nada si la tabla ya existe.
        // Para producción, se recomienda usar migraciones (Sequelize CLI) en lugar de `sync`.
        await sequelize.sync({ alter: true }); // Usar `alter: true` para desarrollo
        console.log("Modelos sincronizados con la base de datos (MySQL).");

        app.listen(puerto, () => {
            console.log(`Api ejecutandose en el puerto: ${puerto}`);
        });
    } catch (error) {
        console.error(
            "Error al conectar a la base de datos o iniciar el servidor:",
            error,
        );
        process.exit(1); // Salir si hay un error crítico
    }
}

startServer();
