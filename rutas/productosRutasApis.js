var ruta = require("express").Router();
var { mostrarProductos, nuevoProducto, buscarPorId, modificarProducto, borrarProducto } = require("../bd/productosBD");

ruta.get("/api/mostrarproductos", async (req, res) => {
    var products = await mostrarProductos();
    if(products.length>0){
        res.status(200).json(products);
    }
    else{
        res.status(400).json("productos no encontrados ")
    }
});
ruta.get("/nuevoproducto", (req, res) => {
    res.render("productos/nuevop");
});

ruta.post("/api/nuevoproducto", async (req, res) => {
    var error = await nuevoProducto(req.body);
    if(error==0){
    res.status(200).json("producto resgistrado bien")
   }
   else{
    res.status(400).json("Error al registar al producto")
   }
   
});


ruta.get("/api/buscarProductoPorId/:id", async (req, res) => {
    var user=await buscarPorId(req.params.id);
    if(user!=undefined){
        res.status(200).json(user);
    }
    else{
        res.status(400).json("producto no encontrado")
    }
  });

ruta.post("/api/editarProducto", async (req, res) => {
    var error=await modificarProducto(req.body);
     if(error==0){
        res.status(200).json("Producto actualizado correctamente")
     }
     else{
        res.status(400).json("Error al actualizar al producto");
     }
  });
ruta.get("/api/borrarProducto/:id", async (req,res)=>{
    var error=await  borrarProducto(req.params.id);
    if(error==0){
     res.status(200).json("producto borrado")
    }
     else{
         res.status(400).json("Erroral borrar al producto");
     }
 })
 
module.exports = ruta;