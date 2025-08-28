import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import { santizarTexto } from "../helpers/sanitizacion.js";

const Historial = sequelize.define(
    "hitoriales",
    {
        id_ciudadano: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        id_delito: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            validate: {
                isDate: {
                    msg: "El formato de la fecha es incorrecto",
                },
            },
        },
        lugar: {
            type: DataTypes.STRING(45),
            set(value) {
                this.setDataValue(santizarTexto(value));
            },
        },
        descripcion: {
            type: DataTypes.TEXT,
            set(value) {
                this.setDataValue(santizarTexto(value));
            },
        },
    },
    {
        tableName: "historiales",
    },
);
export default Historial;
