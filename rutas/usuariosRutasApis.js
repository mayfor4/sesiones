var ruta = require("express").Router();
var {mostrarUsuarios, nuevoUsuario, buscarPorid,modificarUsuario, borrarUsuario} = require("../bd/usuariosBD");
const Usuario = require("../modelos/Usuario");

ruta.get("/api/", async (req, res) => {
    var usuarios = await mostrarUsuarios();
    if(usuarios.length>0){
        res.status(200).json(usuarios);
    }
    else{
        res.status(400).json("Usuarios no encontrados ");
    }
   
})
ruta.get("/nuevousuario",(req,res)=>{
    res.render("usuarios/nuevo");
}); 

ruta.post("/api/nuevousuario",async(req,res)=>{
    var error=await nuevoUsuario(req.body);
   if(error==0){
    res.status(200).json("usuario  resgistrado bien")
   }
   else{
    res.status(400).json("Error al registar al usuario")
   }
   
});


ruta.get("/api/buscarUsuarioPorId/:id", async (req, res) => {
    var user=await buscarPorid(req.params.id);
    if(user!=undefined){
        res.status(200).json(user);
    }
    else{
        res.status(400).json("usuario no encontrado")
    }
  });

  ruta.post("/api/editarUsuario",async(req,res)=>{
     var error=await modificarUsuario(req.body);
     if(error==0){
        res.status(200).json("Usuario actualizado correctamente")
     }
     else{
        res.status(400).json("Error al actualizar al usuario");
     }
  });

ruta.get("/api/borrarUsuario/:id", async (req,res)=>{
   var error=await  borrarUsuario(req.params.id);
   if(error==0){
    res.status(200).json("usuario borrado")
   }
    else{
        res.status(400).json("Erroral borrar al usuario");
    }
})

module.exports = ruta;