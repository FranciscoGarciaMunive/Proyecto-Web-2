import { Gerente } from "../models/Gerente.js"
import { Habitacion } from "../models/Habitacion.js"
import { Hotel } from "../models/Hotel.js"

function relacionHotelGerente() {
    Hotel.belongsTo(Gerente, {foreignKey: "id_grt"});
    Gerente.hasOne(Hotel, {foreignKey: "id_grt"});
}

function relacionHotelHabitaciones() {
    Habitacion.belongsTo(Hotel, {foreignKey:"id_htl"});
    Hotel.hasMany(Habitacion, {foreignKey:"id_htl"});
}

export {
    relacionHotelGerente,
    relacionHotelHabitaciones
}