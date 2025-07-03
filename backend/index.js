import express from "express";
import ciudadano from "./src/controllers/ciudadano.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import sequelize from "./src/config/database.js";
import Ciudadano from "./src/models/ciudadano.js";

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
