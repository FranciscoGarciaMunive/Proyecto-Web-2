import express from 'express';
import { paginaVisitas,} from '../controller/contralor.js';
import{paginaGerente, guardarGerente, paginaNuevoGerente, cambiarGerente, eliminarGerente} from '../controller/gerente.js';
import { cambiarHabitacion, eliminarHabitacion, guardarHabitacion, paginaHabitacion, paginaNuevaHabitacion } from '../controller/habitacion.js';
import{paginaHotel,guardarHotel,  paginaNuevoHotel, cambiarHotel, eliminarHotel}from '../controller/hotel.js';
import {cerrarSesion, paginaInicio,credenciales,salto} from '../controller/controladorL.js';
const rutas = express.Router();

rutas.get("/",paginaInicio);
rutas.get("/Visitas", paginaVisitas);

rutas.get("/gerentes", paginaGerente);
rutas.get("/guardarGerente", paginaNuevoGerente);
rutas.post("/nuevoGerente", guardarGerente);
rutas.get("/cambiarGerente", cambiarGerente);
rutas.get("/eliminarGerente", eliminarGerente);

rutas.get("/hoteles", paginaHotel);
rutas.get("/guardarHotel", paginaNuevoHotel);
rutas.post("/nuevoHotel", guardarHotel);
rutas.get("/cambiarHotel", cambiarHotel);
rutas.get("/eliminarHotel", eliminarHotel);

rutas.get("/habitaciones", paginaHabitacion);
rutas.get("/guardarHabitacion", paginaNuevaHabitacion);
rutas.post("/nuevaHabitacion", guardarHabitacion);
rutas.get("/cambiarHabitacion", cambiarHabitacion);
rutas.get("/eliminarHabitacion", eliminarHabitacion);

rutas.post("/credenciales",credenciales);
rutas.get("/cerrarsesion", cerrarSesion);
rutas.get("/salto",salto);

export default rutas;
