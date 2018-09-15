const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => { //con esta funcion vamos a guardar nuestra tarea al json
    let data = JSON.stringify(listadoPorHacer); //trabajamos con el arreglo de tareas que vamos creando, el JSON.stringify, se encarga de formatearlo, en fomrato json valido
    //si no ocupamos el json.stringify nos sale esto [object Object],[object Object],[object Object],[object Object]
    fs.writeFile('db/data.json', data, (err) => { //el path fue el raiz de app
        if (err) throw new Error("No se pudo grabar", err);
    });
}

const cargarDB = () => {
    try {
        //estando del lado del servidor nosotros podemos leer el contenido del archivo JSON
        listadoPorHacer = require('../db/data.json') //por qué aqui es la ruta así de esta manera
            //console.log(listadoPorHacer);
    } catch (error) { //para que no nos lance un error cuando nuestro arrglo este vacio, usamos este catch
        listadoPorHacer = [];
    }

}

//ahora vamos a hacer el proceso inversio leer el json y retornarlo en el arreglo del listado por hacer

const crear = (descripcion) => {

    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer); //aqui mandamos el objeto creamos y lo agregamos al arreglo
    guardarDB(); // y despues lo grabamos al json
    return porHacer;

}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}


const actualizar = (descripcion, completado = true) => {
    cargarDB(); //cargamos las tareas que ya tenemos creadas
    let index = listadoPorHacer.findIndex(tarea => { //esto es igual a la posicion index que concide con la descripcion que va llegar del parametro
        return tarea.descripcion === descripcion; //esto es igual que el ejercicio de empleados y salarios, va recorrer item tras item hasta regresar el 
        // index del objeto que concide el valor de su propiedad descripcion con la ingresada por el parametro
        //este es un callback, y hace un ciclo interno por cada uno de los elementos mediante la palabra clave tarea 

        //esto nos podria entregar un numero mayor o igual a 0, o inclusive un -1, que significa que el elemento no existe
    })
    if (index >= 0) {
        listadoPorHacer[index].completado = completado; //en consola ademas de enviarnos  como argumentos la descripcion de la tarea, tambien nos mandaria el valor true de completado, 
        //de este manera el valor con la que fue creada (cambiaria a false);
        guardarDB();
        return listadoPorHacer[index];
    } else {
        return false;
    }

}


const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });


    if (index >= 0) {
        let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
        //filter regresa un nuevo arreglo, es parecida a la funcion index, regresa todos lo elementos, que NO coincidad con este elemento tarea.descripcion !== descripcion
        listadoPorHacer = nuevoListado;
        guardarDB();
        return "la tarea: " + descripcion + "se ha borrado";
    } else {
        return descripcion + "esa tarea no existe";
    }


    /*tambien se pudo haber hecho de esta forma la parte de arriba:


      if( listadoPorHacer.length === nuevoListado.length) { //si tiene la misma medida es que no se borro nada
            return false;
      }else {
           listadoPorHacer = nuevoListado;
            guardarDB();
            return true;
      }
      */

}

module.exports = { //duda las funciones a exportar, significa simplemente que estan disponibles para utilizar, es decir no necesariamente se van a ocupatr
    crear,
    getListado,
    actualizar,
    borrar

}