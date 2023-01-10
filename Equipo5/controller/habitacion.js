import {Habitacion} from '../models/Habitacion.js'


const paginaHabitacion= async(req,res)=>{
    //obtener registros
    const habitaciones = await Habitacion.findAll({
        attributes : ['id_hbt','piso', 'nombre', 'refrigerador']
    });

    res.render("habitaciones" , {
        pagina:"Habitaciones",
        habitaciones:habitaciones
    });
}
const guardarHabitacion = async (req, res) => {
    const { id_hbt,piso,nombre,refrigerador} = req.body;
    const errores = [];
    if (piso.trim() === "") {
        errores.push({ mensaje: "El piso no puede estar vacío" });
    }
    if (nombre.trim() === "") {
        errores.push({ mensaje: "El nombre no puede estar vacío" });
    }
    if (refrigerador.trim() === "") {
        errores.push({ mensaje: "El refrigerador no puede estar vacío" });
    }
    if (errores.length > 0) {
        res.render("nuevaHabitacion", {
            pagina: "Nueva Habitacion",
            errores,
            piso,
            nombre,
            refrigerador
        });

    } else {
        console.log(id_hbt);
        if (id_hbt > 0) {
            //Actualizar
            console.log("actualizar");
            try {
                await Habitacion.update({
                    piso,
                    nombre,
                    refrigerador
                }, { where: { id_hbt: id_hbt } });
                res.redirect('/habitaciones');
            } catch (error) {
                console.log(error);
            }
        } else {
            //almacena en la base de datos
            try {
                await Habitacion.create({
                    piso,
                    nombre,
                    refrigerador
                });
                res.redirect('/habitaciones');
            } catch (error) {
                console.log(error);
            }
        }
    }
};


const paginaNuevaHabitacion=async(req,res)=>{
    res.render("nuevaHabitacion",{
        pagina:"Nueva Habitacion",
    });
}



const cambiarHabitacion = async (req, res) => {
    //edita los datos en la BDD
    console.log('listo ' + req.query.id_hbt)
    try {
        const com = await Habitacion.findByPk(req.query.id_hbt)
        console.log(com);
        const errores = [];

        res.render("nuevaHabitacion", {
            pagina: "Nueva Habitacion",
            errores,
            id_hbt:com.id_hbt,
            piso: com.piso,
            nombre: com.nombre,
            refrigerador:com.refrigerador
            
        });


    } catch (error) {
        console.log(error);
    }
};

const eliminarHabitacion = async (req, res) => {
    //elimina los datos de la BDD
    console.log('listo borrar' + req.query.id_hbt)
    try {
        await Habitacion.destroy({
            where: { id_hbt: req.query.id_hbt }
        });
        res.redirect("/habitaciones");

    } catch (error) {
        console.log(error);
    }

}


export {
    paginaHabitacion,
    guardarHabitacion,
    paginaNuevaHabitacion,
    cambiarHabitacion,
    eliminarHabitacion
}