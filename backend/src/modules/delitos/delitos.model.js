import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import { santizarTexto } from "../helpers/sanitizacion.js";

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
            set(value) {
                if (value) {
                    this.setDataValue("nombre", santizarTexto(value));
                }
            },
            validate: {
                notEmpty: {
                    msg: "El campo 'nombre' no puede ser vacio",
                },
            },
        },
        grado: {
            type: DataTypes.STRING(45),
            allowNull: false,
            set(value) {
                if (value) {
                    this.setDataValue("grado", santizarTexto(value));
                }
            },

            notEmpty: {
                msg: "El campo 'grado' no puede ser vacio",
            },
            isAlpha: {
                msg: "El grado del delito solo puede contener letras",
            },
        },
    },
    {
        tableName: "delitos",
    },
);

export default Delito;
