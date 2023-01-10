
// const paginaInicio = (req,res) => {
//     res.render("inicio",{
//         pagina:"Zacatlan",
//     });
// }
const paginaVisitas = (req,res)=>{
    res.render("visitas",{
        pagina :"Visitas",
    });
}


export {
    //paginaInicio,
    paginaVisitas,
    
}