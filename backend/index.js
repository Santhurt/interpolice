import express from "express";
import ciudadano from "./src/ciudadano.js";
import "dotenv/config";
import cors from "cors";

// Instanciamos la libreria express en la constante app
// Heredamos todos los metodos de express
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", ciudadano);

const puerto = 4000;
app.listen(puerto, () => {
    console.log(`Api ejecutandose en el puerto: ${puerto}`);
});
