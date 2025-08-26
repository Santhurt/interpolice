import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Rol = sequelize.define(
    "Rol",
    {
        id_rol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(45),
        },
        estado: {
            type: DataTypes.ENUM("activo", "inactivo"),
            defaultValue: "activo",
        },
    },
    {
        tableName: "roles",
    },
);

export default Rol;
