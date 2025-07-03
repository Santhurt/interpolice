import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Ciudadano = sequelize.define(
    "Ciudadano",
    {
        id_ciudadano: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(255), // Ajusta el tamaño según tu esquema de DB
            allowNull: false,
        },
        apellidos: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        apodo: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        fecha_nacimiento: {
            type: DataTypes.DATEONLY, // O DataTypes.DATE si incluyes la hora
            allowNull: true,
        },
        planeta_origen: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        planeta_residencia: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        foto: {
            type: DataTypes.STRING(255), // Ruta al archivo de la foto
            allowNull: true,
        },
        codigo: {
            type: DataTypes.STRING(255), // Ruta al archivo del código QR
            allowNull: true,
        },
        estado: {
            type: DataTypes.STRING(50), // Por ejemplo, 'activo', 'inactivo', etc.
            allowNull: false,
            defaultValue: "activo", // Valor por defecto si no se especifica
        },
    },
    {
        tableName: "ciudadanos",
        timestamps: false,
    },
);

export default Ciudadano;
