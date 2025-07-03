import { Sequelize } from "sequelize";
import "dotenv/config"; 

console.log("Variables de entorno cargadas:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "********" : "UNDEFINED"); // No loguear la contraseña completa
console.log("DB_NAME:", process.env.DB_NAME);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: true,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
);

export default sequelize;
