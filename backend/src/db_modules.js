// Importa el módulo mysql2/promise
import mysql from "mysql2/promise";
import "dotenv/config";

let connection;

try {
    // Crea la conexión a la base de datos
    connection = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
    });

    connection.connect();
} catch (err) {
    console.error("Error:", err);
}
export default connection;
