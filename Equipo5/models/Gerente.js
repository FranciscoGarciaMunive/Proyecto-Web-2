import Sequelize from "sequelize";
import db from "../config/db.js";
import { Hotel } from "./Hotel.js";

export const Gerente = db.define(
  "gerentes",
  {
    id_grt: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    ap_paterno: {
      type: Sequelize.INTEGER,
    },
    ap_materno: {
      type: Sequelize.STRING,
    },
    telefono: {
      type: Sequelize.STRING,
    },
    imagen:{
      type:Sequelize.STRING
    },
  },
  { timestamps: false }
);
Gerente.hasOne(Hotel, {
  foreignKey: {
    name: "id_grt",
  },
});

Hotel.belongsTo(Gerente, {
  foreignKey: {
    name: "id_grt",
  },
});
