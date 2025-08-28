import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import validator from "validator";

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
            set(value) {
                if (value) {
                    const nombreSanitizado = validator.escape(
                        validator.trim(value),
                    );
                    this.setDataValue("nombre", nombreSanitizado);
                }
            },
            validate: {
                notEmpty: {
                    msg: "El campo 'nombre' no puede estar vacío.",
                },
            },
        },
        apellidos: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        apodo: {
            type: DataTypes.STRING(45),
            allowNull: false,
            set(value) {
                if (value) {
                    const apodoSantizado = validator.trim(value);
                    this.setDataValue("apodo", apodoSantizado);
                }
            },
            validate: {
                isAlphanumeric: {
                    msg: "El campo 'apodo' solo puede contener letras y numeros",
                },
            },
        },
        fecha_nacimiento: {
            type: DataTypes.DATEONLY,
            validate: {
                isDate: {
                    msg: "El formato de la fecha de nacimiento es invalida",
                },
            },
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
            type: DataTypes.STRING(150),
        },
        estado: {
            type: DataTypes.ENUM("vivo", "muerto", "congelado"),
            allowNull: false,
            defaultValue: "vivo",
            validate: {
                isIn: {
                    args: [["vivo", "muerto", "congelado"]],
                    msg: "El estado debe ser 'activo', 'inactivo' o 'supendido'",
                },
            },
        },
    },
    {
        tableName: "ciudadanos",
        timestamps: true,
    },
);

export default Ciudadano;
