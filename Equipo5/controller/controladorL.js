const paginaInicio = (req,res) => {
    res.render("inicio",{
        pagina:"Zacatlan"
    });
}

const salto = (req,res) => {
    res.render("logindos",{
        pagina: "Si hay Datos",
        usuario: req.session.nombre
    });
}
const credenciales = (req,res) => {
    const {
        usuario,
        clave
    } = req.body;

    //1.- consultar la base de datos con el usuario y clave
    //2.- si no existe renderizar de nuevo login
    //3.- si existe, el usuario y rol, opcional permisos
    //4.- guardar en variable de sesion
    //5.- mandarlo a inicio


       
    
}

const cerrarSesion = (req, res) => {
    req.session.destroy()
    res.render("Inicio",{
        pagina: "Zacatlan",
    });
}


export{
    paginaInicio,
    cerrarSesion,
    credenciales,
    salto
}