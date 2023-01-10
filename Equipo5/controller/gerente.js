import {Gerente} from '../models/Gerente.js'


const paginaInicio = (req,res) => {
    res.render("inicio",{
        pagina:"SISTEMA DE HOTELES"
    });
}
const paginaGerente = async (req, res) => {
    //obtener registros
    const gerentes = await Gerente.findAll({
        attributes: [ 'id_grt','nombre', 'ap_paterno', 'ap_materno', 'telefono', 'imagen']
    });

    res.render("gerentes", {
        pagina: "Gerentes",
        gerentes: gerentes
    });
}
const guardarGerente = async (req, res) => {
    const { id_grt, nombre, ap_paterno, ap_materno, telefono, imagen } = req.body;
    const errores = [];
    if (nombre.trim() === "") {
        errores.push({ mensaje: "El nombre puede estar vacío" });
    }
    if (ap_paterno.trim() === "") {
        errores.push({ mensaje: "El Apellido paterno puede estar vacío" });
    }
    if (ap_materno.trim() === "") {
        errores.push({ mensaje: "El Apellido materno puede estar vacío" });
    }
    if (telefono.trim() === "") {
        errores.push({ mensaje: "El telefono puede estar vacío" });
    }
    if (imagen.trim() === "") {
        errores.push({ mensaje: "La imagen puede estar vacía" });
    }

    if (errores.length > 0) {
        res.render("nuevoGerente", {
            pagina: "Nuevo Gerente",
            errores,
            nombre,
            ap_paterno,
            ap_materno,
            telefono,
            imagennuevo
        });

    } else {
        console.log(id_grt);
        if (id_grt > 0) {
            //Actualizar
            console.log("actualizar");
            try {
                await Gerente.update({
                    nombre,
                    ap_paterno,
                    ap_materno,
                    telefono,
                    imagen
                }, { where: { id_grt: id_grt } });
                res.redirect('/gerentes');
            } catch (error) {
                console.log(error);
            }
        } else {
            //almacenar en la base de datos
            try {
                await Gerente.create({
                    nombre,
                    ap_paterno,
                    ap_materno,
                    telefono,
                    imagen
                });
                res.redirect('/gerentes');
            } catch (error) {
                console.log(error);
            }
        }
    }
};


const paginaNuevoGerente=(req,res)=>{
    res.render("nuevoGerente",{
        pagina:"Nuevo Gerente",
    });
}



const cambiarGerente = async (req, res) => {
    console.log('listo ' + req.query.id_grt)
    try {
        const com = await Gerente.findByPk(req.query.id_grt)
        console.log(com);
        const errores = [];

        res.render("nuevoGerente", {
            pagina: "Nuevo Gerente",
            errores,
            id_grt: com.id_grt,
            nombre: com.nombre,
            ap_paterno: com.ap_paterno,
            ap_materno: com.ap_materno,
            telefono: com.telefono,
            imagen: com.imagen
            
            
        });


    } catch (error) {
        console.log(error);
    }
};

const eliminarGerente = async (req, res) => {
    console.log('listo borrar' + req.query.id_grt)
    try {
        await Gerente.destroy({
            where: { id_grt: req.query.id_grt }
        });
        res.redirect("/gerentes");

    } catch (error) {
        console.log(error);
    }

}


export {
    paginaInicio,
    paginaGerente,
    guardarGerente,
    paginaNuevoGerente,
    cambiarGerente,
    eliminarGerente
    
}