//const argv = require('yargs').argv;

const argv = require('./config/yargs').argv;

const porHacer = require('./por-hacer/por-hacer'); //revisar la destructuracion en los otros archivos

var colors = require('colors');


//console.log(argv);

let comando = argv._[0];

switch (comando) {

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion); // estamos llamando el metodo crear que fue exportado del en el archivo por-hacer
        //aqui se llamando la funcion, y no se esta manejando por destructuracion, como en los otros ejemplos
        console.log(tarea)
        break;

    case 'listar':
        // console.log("Mostrar todas las tareas por hacer");

        let listado = porHacer.getListado(argv.mostrar);

        for (let tarea of listado) {
            console.log("====Por hacer====".green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log("================".green);
        }
        //console.log(listado);

        break;

    case 'actualizar':
        let actualizada = porHacer.actualizar(argv.descripcion, argv.completado);

        //si son dos palabras los argumentos mandarlos entre comillas node app actualizar -d "seguir estudiando"
        console.log(actualizada);
        break;
    case "borrar":
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log("comando no reconocido");



}