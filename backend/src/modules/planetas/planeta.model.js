import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import validator from "validator";

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
        poblacion: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El campo 'poblacion' no puede estar vacío.",
                },
            },
        },
    },
    {
        tableName: "planetas",
    },
);

export default Planeta;
