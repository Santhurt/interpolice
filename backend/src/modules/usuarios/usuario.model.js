import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import validator from "validator";

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
            set(value) {
                if (value) {
                    const nombreSanitizado = validator.trim(value);
                    this.setDataValue("nombre", nombreSanitizado);
                }
            },
        },
        apellidos: {
            type: DataTypes.TEXT,
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            validate: {
                isDate: {
                    msg: "El formato de fecha no es valido",
                },
            },
        },
        correo: {
            type: DataTypes.STRING(100),
            allowNull: false,
            set(value) {
                if (value) {
                    const emailSanitizado = validator.normalizeEmail(value, {
                        gmail_remove_dots: false,
                        gmail_remove_subaddress: false,
                    });
                    this.setDataValue("correo", emailSanitizado);
                }
            },
            validate: {
                notEmpty: {
                    msg: "El correo no puede estar vacio",
                },
                isEmail: {
                    msg: "El formato de correo es invalido",
                },
            },
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isStrongPassword(value) {
                    if (
                        !validator.isStrongPassword(value, {
                            minLength: 8,
                            minNumbers: 2,
                        })
                    ) {
                        throw new Error(
                            "La contraseña debe tener 8 carácteres y al menos dos números",
                        );
                    }
                },
            },
        },
        estado: {
            type: DataTypes.ENUM("activo", "inactivo"),
            defaultValue: "activo",
            validate: {
                isIn: {
                    args: [["activo", "inactivo"]],
                    msg: "El usuario solo puede estar activo o inactivo",
                },
            },
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
