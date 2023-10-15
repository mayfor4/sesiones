/*var ruta = require("express").Router();
var subirArchivo=require("../middlewares/middlewares").subirArchivo;
var path=require("path");
var fs = require("fs");
var { mostrarProductos, nuevoProducto, buscarPorId, modificarProducto, borrarProducto } = require("../bd/productosBD");


ruta.get("/mostrarProductos", async (req, res) => {
    var products = await mostrarProductos();
    res.render("productos/mostrarp", { products });
});


ruta.get("/nuevoproducto", (req, res) => {
    res.render("productos/nuevop");
});

ruta.post("/nuevoproducto", subirArchivo(),async (req, res) => {
    req.body.foto=req.file.originalname;
    var error = await nuevoProducto(req.body);
    res.redirect("/mostrarProductos");
});


ruta.get("/editarProducto/:id", async (req, res) => {
    var product = await buscarPorId(req.params.id);
    res.render('productos/modificarp', { product });
});

/*ruta.post("/editarProducto", subirArchivo(),async (req, res) => {
    req.body.foto=req.file.originalname;
    var error = await modificarProducto(req.body);
    res.redirect("/mostrarProductos");
});*/
/*ruta.post("/editarProducto",subirArchivo(),async (req,res)=>{
    try {
            var rutaImagen = path.join(__dirname, "..", "web", "images", req.body.foto);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
                req.body.foto= req.file.originalname;
                await modificarProducto(req.body);
            }
        
        res.redirect("/mostrarProductos");
    } catch (error) {
        console.error("Error al editar producto :(", error);
    }
});
/*ruta.get("/borrarProducto/:id", async (req,res)=>{
    await borrarProducto(req.params.id);
    //res.redirect("/mostrarProductos");zz
})*/
/*ruta.get("/borrarProducto/:id", async (req, res) => {
    try {
        var product = await buscarPorId(req.params.id);
        if (product) {
            var rutaImagen = path.join(__dirname, "..", "web", "images", product.foto);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
            }
            await borrarProducto(req.params.id);
        }
        res.redirect("/mostrarProductos");
    } catch (error) {
        console.error("Error al borrar producto", error);
    }
});
module.exports = ruta;*/

var ruta = require("express").Router();
var subirArchivo = require ("../middlewares/middlewares").subirArchivo;
var fs = require("fs");
var path= require("path");
var {mostrarProductos, nuevoProducto, buscarPorId, modificarProducto,borrarProducto} = require("../bd/productosBD");

ruta.get("/mostrarProductos", async (req, res) => {
    var products = await mostrarProductos();
    //console.log(users);
    res.render("productos/mostrarP", {products });
})
ruta.get("/nuevoProducto",(req,res)=>{
    res.render("productos/nuevoP");
}); 

ruta.post("/nuevoProducto",subirArchivo(),async (req,res)=>{
    req.body.foto= req.file.originalname;
    //console.log(req.body);
    var error= await nuevoProducto(req.body);
    console.log(error);
    res.redirect("/mostrarProductos"); 
}); 

ruta.get("/editarProducto/:id",async(req,res)=>{
    var product= await buscarPorId(req.params.id);
    res.render("productos/modificarP",{product });
});

ruta.post("/editarProducto",subirArchivo(),async (req,res)=>{
    try {
            var rutaImagen = path.join(__dirname, "..", "web", "images", req.body.foto);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
                req.body.foto= req.file.originalname;
                await modificarProducto(req.body);
            }
        
        res.redirect("/mostrarProductos");
    } catch (error) {
        console.error("Error al editar producto :(", error);
    }
});

ruta.get("/borrarProducto/:id", async (req,res)=>{
    try {
        var product  = await buscarPorId(req.params.id);
        if (product ) {
            var rutaImagen = path.join(__dirname, "..", "web", "images", product.foto);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
            }
            await borrarProducto(req.params.id);
        }
        res.redirect("/mostrarProductos");
    } catch (error) {
        console.error("Error al borrar producto :( ", error);
    }
    
});



module.exports = ruta;