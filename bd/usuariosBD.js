var conexion = require("./conexion").conexionUsuarios;
var Usuario = require("../modelos/Usuario");

async function mostrarUsuarios(){
    var users = [];
    try {
        var usuarios = await conexion.get();
        usuarios.forEach(usuario => {
        //console.log(usuario.data());
        var usuario1 = new Usuario(usuario.id, usuario.data());
        if(usuario1.bandera == 0){
            users.push(usuario1.obtenerUsuario);
        }
    })
    
    }
    catch(err) {
        console.log("Error al mostrar usuarios " + err);
        users = [];
    }
    return users;
}

async function buscarPorid(id) {
    var user;
    try {
        var usuarioBD = await conexion.doc(id).get();
        //console.log(usuarioBD)
        var usuarioObjeto = new Usuario(usuarioBD.id, usuarioBD.data());
        if (usuarioObjeto.bandera == 0) {
            user = usuarioObjeto.obtenerUsuario;
        }
    } catch (err) {
        console.log("error mostrar id" + err);
    }
    return user; // Return user instead of users
}

async function nuevoUsuario(newUser){
    var error=1;
    try{
      var usuario1 = new Usuario(null,newUser); 
      //console.log(usuario1);
      if(usuario1.bandera==0){
        //console.log(usuario1.obtenerUsuario);
       await conexion.doc().set(usuario1.obtenerUsuario); 
        error=0
      }
      else{
        console.log("Datos incorrectos del formulario");
      }
    }
    catch(err){
      console.log("Error al crear un nuevo usuario "+err);
    }
    return error;
  }
  
  module.exports = {
      mostrarUsuarios
  }
async function modificarUsuario(datos) {
    var error=1;
    var user=await buscarPorid(datos.id);
    if (user!=undefined){
    console.log("datos");
    var user = new Usuario(datos.id, datos);
    if (user.bandera == 0) {
        try {
            await conexion.doc(user.id).set(user.obtenerUsuario);
            console.log("Registro actualizado");
            error = 0;
        } catch (err) {
            console.log("Error al modificar al usuario" + err);
        }

    }
}
    else{
        console.log("Error lod datos no son validos");
    }
    return error;
}

async function borrarUsuario(id) {
    var error=1;
    var user=await buscarPorid(id);
    if (user!=undefined){

    try {
        await conexion.doc(id).delete();
        console.log("Registro borrado");
        error=0;
    } catch (err) {
        console.log("Error al borrar al usuario" + err);
    }
}
return error;
}



module.exports = {
    mostrarUsuarios,
    buscarPorid,
    nuevoUsuario,
    modificarUsuario,
    borrarUsuario
};