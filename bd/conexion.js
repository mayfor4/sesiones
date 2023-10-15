var admin=require("firebase-admin");
var keys=require("../keys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});

var micuenta=admin.firestore();
var conexionUsuarios=micuenta.collection("usuarios");
var conexionProductos=micuenta.collection("productos");


module.exports={
    conexionUsuarios,
    conexionProductos
}