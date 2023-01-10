import Sequelize from "sequelize";
import db from "../config/db.js";
import { Habitacion } from "./Habitacion.js";

export const Hotel = db.define(
  "hoteles",
  {
    id_htl: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    direccion: {
      type: Sequelize.STRING,
    },
    telefono: {
      type: Sequelize.STRING,
    },
    correo: {
      type: Sequelize.STRING,
    },
    imagen:{
      type:Sequelize.STRING
    },
    id_grt: {
      type: Sequelize.INTEGER,
    },
  },
  { timestamps: false }
);
Hotel.hasMany (Habitacion,{
  foreignKey:'id_htl'
});

Habitacion.belongsTo(Hotel, {
  foreignKey: {
    name: "id_htl",
  },
});