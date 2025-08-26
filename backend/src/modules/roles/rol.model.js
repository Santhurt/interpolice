import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Rol = sequelize.define("Rol", {
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(45),
    },
});

export default Rol;
