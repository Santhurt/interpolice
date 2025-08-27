import Delito from "../delitos/delitos.model.js";
import Historial from "../historial/historial.model.js";
import Ciudadano from "../ciudadano/ciudadano.model.js";

Ciudadano.belongsToMany(Delito, { through: Historial, foreignKey: "id_ciudadano"});
Delito.belongsToMany(Ciudadano, { through: Historial , foreignKey: "id_delito"});
