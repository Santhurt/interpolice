import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Planeta = sequelize.define(
    "Planeta",
    {
        id_planeta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(45),
            defaultValue: "Desconocido",
        },
        poblacion: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        tableName: "planetas",
    },
);

export default Planeta;
