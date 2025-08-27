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
    },
    {
        tableName: "historiales",
    },
);
export default Historial;
