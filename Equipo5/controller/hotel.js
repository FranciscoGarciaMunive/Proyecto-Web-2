import db from '../config/db.js';
import { Gerente } from '../models/Gerente.js';
import {Hotel} from '../models/Hotel.js';
import { MisDatos } from "../models/MisDatos.js";


const paginaHotel= async(req,res)=>{
    //obtener registros
    const hoteles = await Hotel.findAll({
        include:{
            model:Gerente,
        }
    });
    const info = await db.query(
        "select a.nombre as dato1, a.direccion as dato2,b.nombre as dato3,"+
        "b.ap_paterno as dato4, b.id_grt as dato5 from hoteles a inner join gerentes b on a.id_grt=b.id_grt",{
            model:MisDatos,
            mapToModel:true
        }
    );

    res.render("hoteles" , {
        pagina:"Hoteles",
        hoteles:hoteles,
        info:info
    });
}
const guardarHotel = async (req, res) => {
    const { id_htl,id_grt,nombre,direccion,correo,telefono,imagen} = req.body;
    const errores = [];
    if (nombre.trim() === "") {
        errores.push({ mensaje: "El nombre no debe ser vacio" });
    }
    if (id_grt.trim() === "") {
        errores.push({ mensaje: "La ID no debe ser vacio" });
    }
    if (direccion.trim() === "") {
        errores.push({ mensaje: "La direccion no debe ser vacio" });
    }
    if (correo.trim() === "") {
        errores.push({ mensaje: "El correo no debe ser vacio" });
    }
    if (telefono.trim() === "") {
        errores.push({ mensaje: "El telefono no debe ser vacio" });
    }
    if (imagen.trim() === "") {
        errores.push({ mensaje: "La imagen no debe ser vacio" });
    }

    if (errores.length > 0) {
        res.render("nuevoHotel", {
            pagina: "Nuevo Hotel",
            errores,
            id_grt,
            nombre,
            direccion,
            correo,
            telefono,
            imagen
        });

    } else {
        console.log(id_htl);
        if (id_htl > 0) {
            //Actualizar
            try {
                await Hotel.update({
                    id_grt,
                    nombre,
                    direccion,
                    correo,
                    telefono,
                    imagen
                }, { where: { id_htl: id_htl } });
                res.redirect('/hoteles');
            } catch (error) {
                console.log(error);
            }
        } else {
            //almacena en la base de datos
            try {
                await Hotel.create({
                    id_grt,
                    nombre,
                    direccion,
                    correo,
                    telefono,
                    imagen
                });
                res.redirect('/hoteles');
            } catch (error) {
                console.log(error);
            }
        }
    }
};


const paginaNuevoHotel=async(req,res)=>{
    const hoteles = await Hotel.findAll({
        include: {
          model: Gerente,
        }
      });
      const hola = await db.query(
        "select nombre as dato1,id_grt as dato2 from gerentes where id_grt not in(select id_grt from hoteles)"
      ,{
        model:MisDatos,
        mapToModel:true


      });
      
      const gerentes = await Gerente.findAll();
      const arreglo  = await Hotel.findAll({where :{ id_grt  : null}});
      console.log(arreglo)
      res.render("nuevoHotel",{
        pagina:"NuevoHotel",
        hoteles : hoteles,
        hola : hola,
        gerentes : gerentes,
        arreglo : arreglo 

    });
    
    
}



const cambiarHotel = async (req, res) => {
    console.log('listo ' + req.query.id_htl)
    try {
    const hola = await db.query(
        "select nombre as dato1,id_grt as dato2 from gerentes where id_grt not in(select id_grt from hoteles)",
        {
            model:MisDatos,
            mapToModel:true
        }
    );
    
        const com = await Hotel.findByPk(req.query.id_htl)
        console.log(com);
        const errores = [];

        res.render("nuevoHotel", {
            pagina: "Nuevo Hotel",
            errores,
            id_htl: com.id_htl,
            id_grt:com.id_grt,
            nombre:com.nombre,
            direccion: com.direccion,
            correo: com.correo,
            telefono: com.telefono,
            imagen: com.imagen,
            hola:hola
        });


    } catch (error) {
        console.log(error);
    }
};

const eliminarHotel = async (req, res) => {
    const{id}=req.params;
    try {
        await Hotel.destroy({
            where: { id_htl:id },
            cascade:true
        });
        res.redirect("/hoteles");

    } catch (error) {
        console.log(error);
    }

}


export {
    paginaHotel,
    guardarHotel,
    paginaNuevoHotel,
    cambiarHotel,
    eliminarHotel
}

