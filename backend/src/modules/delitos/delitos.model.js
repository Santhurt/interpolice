import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Delito = sequelize.define(
    "delitos",
    {
        id_delito: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        grado: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
    },
    {
        tableName: "delitos",
    },
);

export default Delito;
