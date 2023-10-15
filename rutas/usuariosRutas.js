var ruta = require("express").Router();
var path=require("path");
var fs = require("fs");
var subirArchivo=require("../middlewares/middlewares").subirArchivo;
var {mostrarUsuarios, nuevoUsuario, buscarPorid,modificarUsuario, borrarUsuario} = require("../bd/usuariosBD");

ruta.get("/", async (req, res) => {
    var users = await mostrarUsuarios();
    //console.log(users);
    res.render("usuarios/mostrar", {users});
})
ruta.get("/nuevousuario",(req,res)=>{
    res.render("usuarios/nuevo");
}); 

ruta.post("/nuevousuario",subirArchivo(),async(req,res)=>{
    //console.log(req.file.originalname);
    req.body.foto=req.file.originalname;
    //res.end();
    var error=await nuevoUsuario(req.body);
    //console.log(error);
    res.redirect("/"); 
});
ruta.get("/editarUsuario/:id", async (req, res) => {
    const user = await buscarPorid(req.params.id);
    //console.log(req.params.id);
    //console.log(user);
    //res.end();
    res.render('usuarios/modificar', {user});
  });

  /*ruta.post("/editarUsuario",subirArchivo(),async(req,res)=>{
    req.body.foto=req.file.originalname;
     var error=await modificarUsuario(req.body);
     //console.log("error");
     res.redirect("/");
  });*/
  ruta.post("/editarUsuario",subirArchivo(), async (req,res)=>{
    try {
        //var usuario = await buscarPorId(req.params.id);
        //console.log(usuario);
           // console.log("hola");
            var rutaImagen = path.join(__dirname, "..", "web", "images", req.body.foto);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
                req.body.foto= req.file.originalname;
                await modificarUsuario(req.body);
            }
        
        res.redirect("/");
    } catch (error) {
        console.error("Error al editar usuario:", error);
    }

});

//ruta.get("/borrarUsuario/:id", async (req,res)=>{
   // await borrarUsuario(req.params.id);
   // res.redirect("/");
//})
ruta.get("/borrarUsuario/:id", async (req, res) => {
    try {
        var usuario = await buscarPorid(req.params.id);
        if (usuario) {
            var rutaImagen = path.join(__dirname, "..", "web", "images", usuario.foto);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
            }
            await borrarUsuario(req.params.id);
        }
        res.redirect("/");
    } catch (error) {
        console.error("Error al borrar usuario:", error);
    }
});

module.exports = ruta;