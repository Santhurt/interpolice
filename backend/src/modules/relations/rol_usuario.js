import Rol from "../roles/rol.model.js";
import Usuario from "../usuarios/usuario.model.js";

Rol.hasMany(Usuario, {
    as: "RolUsuario",
    foreignKey: "id_rol",
});

Usuario.belongsTo(Rol, {
    as: "RolCiudadano",
    foreignKey: "id_rol",
});
