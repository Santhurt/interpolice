import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

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
        },
        lugar: {
            type: DataTypes.STRING(45),
        },
        descripcion: {
            type: DataTypes.TEXT,
        },
    },
    {
        tableName: "historiales",
    },
);
export default Historial;
