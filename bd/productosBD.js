var conexion = require("./conexion").conexionProductos;
var Producto = require("../modelos/Producto"); 

async function mostrarProductos() {
    var products = [];
    try {
        var productos = await conexion.get();
        productos.forEach(producto => {
            var producto1 = new Producto(producto.id, producto.data()); // Corrige "usuario" a "producto"
            if (producto1.bandera == 0) {
                products.push(producto1.obtenerProducto); // Corrige "users" a "products"
            }
        });
    } catch (err) {
        console.log("Error al mostrar productos " + err);
        products = [];
    }
    return products;
}

async function buscarPorId(id) {
    var product;
    try {
        var productoBD = await conexion.doc(id).get();
        var productoObjeto = new Producto(productoBD.id, productoBD.data()); // Corrige "usuario" a "producto"
        if (productoObjeto.bandera == 0) { // Corrige "usuarioObjeto" a "productoObjeto"
            product = productoObjeto.obtenerProducto; // Corrige "user" a "product"
        }
    } catch (err) {
        console.log("Error al mostrar producto por id" + err);
    }
    return product;
}

async function nuevoProducto(newProduct) {
    var error = 1;
    try {
        var producto1 = new Producto(null, newProduct); // Corrige "usuario1" a "producto1"
        if (producto1.bandera == 0) {
            await conexion.doc().set(producto1.obtenerProducto); // Corrige "usuario1.obtenerUsuario" a "producto1.obtenerProducto"
            error = 0;
        } else {
            console.log("Datos incorrectos del formulario");
        }
    } catch (err) {
        console.log("Error al crear un nuevo producto " + err);
    }
    return error;
}

async function modificarProducto(datos) {
    console.log("datos");
    var product = new Producto(datos.id, datos); // Corrige "user" a "product"
    console.log(product);
    var error = 1;
    if (product.bandera == 0) {
        try {
            await conexion.doc(product.id).set(product.obtenerProducto); // Corrige "user" a "product"
            console.log("Registro actualizado");
            error = 0;
        } catch (err) {
            console.log("Error al modificar el producto" + err);
        }
    } else {
        console.log("Error, los datos no son válidos");
    }
    return error;
}

async function borrarProducto(id) {
    var error=1;
    var product=await buscarPorId(id);
    if (product!=undefined){

    try {
        await conexion.doc(id).delete();
        console.log("Registro borrado");
        error=0;
    } catch (err) {
        console.log("Error al borrar al producto" + err);
    }
}
return error;
}

module.exports = {
    mostrarProductos,
    buscarPorId,
    nuevoProducto,
    modificarProducto,
    borrarProducto
};
