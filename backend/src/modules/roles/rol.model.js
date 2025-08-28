import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Rol = sequelize.define(
    "roles",
    {
        id_rol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(45),

            set(value) {
                if (value) {
                    this.setDataValue(santizarTexto(value));
                }
            },

            notEmpty: {
                msg: "El campo 'nombre' no puede ser vacio",
            },
            isAlpha: {
                msg: "El nombre del delito solo puede contener letras",
            },
        },
        estado: {
            type: DataTypes.ENUM("activo", "inactivo"),
            defaultValue: "activo",
            validate: {
                isIn: {
                    args: [["activo", "inactivo"]],
                    msg: "El estado solo puede ser 'activo' o 'inactivo'",
                },
            },
        },
    },
    {
        tableName: "roles",
    },
);

export default Rol;
