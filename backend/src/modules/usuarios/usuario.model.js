import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Usuario = sequelize.define(
    "usuarios",
    {
        documento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        apellidos: {
            type: DataTypes.TEXT,
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
        },
        correo: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        estado: {
            type: DataTypes.ENUM("activo", "inactivo"),
        },
        id_rol: {
            type: DataTypes.INTEGER,
        },
    },
    {
        tableName: "usuarios",
        defaultScope: {
            attributes: { exclude: ["password"] },
        },
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ["correo"],
            },
        ],
    },
);

export default Usuario;
