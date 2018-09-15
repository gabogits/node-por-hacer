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

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion
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