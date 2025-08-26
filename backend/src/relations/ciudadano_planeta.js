import Ciudadano from "../ciudadano/ciudadano.model.js";
import Planeta from "../planetas/planeta.model.js";

Ciudadano.belongsTo(Planeta, {
    as: "PlanetaOrigen",
    foreignKey: "planeta_origen",
});

Ciudadano.belongsTo(Planeta, {
    as: "PlanetaResidencia",
    foreignKey: "planeta_residencia",
});

Planeta.hasMany(Ciudadano, {
    as: "CiudadanoDeOrigen",
    foreignKey: "planeta_origen",
});

Planeta.hasMany(Ciudadano, {
    as: "CiudadanoDeResidencia",
    foreignKey: "planeta_residencia",
});
