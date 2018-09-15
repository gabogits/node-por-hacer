const descripcion = {
    demand: true,
    alias: "d",
    desc: "Descripcion de la tarea por hacer"
};

const completado = {
    alias: "c",
    default: true,
    desc: "Marca como completado  o pendeinte la tarea"
};

const mostrar = {
    alias: "m",
    default: "todas",
};

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion
    })
    .command('listar', 'regresa un listado de tareas, terminadas o no', {
        mostrar
    })
    .command('actualizar', 'Actualiza el estado completo de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'borrar una tarea', {
        descripcion,
        completado
    })
    .help()
    .argv;

module.exports = {
    argv
}