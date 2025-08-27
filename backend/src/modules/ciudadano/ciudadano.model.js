import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

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
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        apellidos: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        apodo: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        fecha_nacimiento: {
            type: DataTypes.DATEONLY,
        },
        planeta_origen: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        planeta_residencia: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        codigo: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        foto: {
            type: DataTypes.STRING(150)
        },
        estado: {
            type: DataTypes.STRING(45),
            allowNull: false,
            defaultValue: "activo",
        },
    },
    {
        tableName: "ciudadanos",
        timestamps: true,
    },
);

export default Ciudadano;
