// ======================================
// Importar paquetes ====================
// ======================================
const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();

require('colors');

// ======================================
// Array de preguntas ===================
// ======================================
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar Ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ]
    }
]

// ======================================
// Funcion para mostrar el menu =========
// ======================================
const inquireMenu = async () => {

    //Limpiar consola
    console.clear();

    //Titulo del menu
    console.log('=========================='.green);
    console.log(' Seleccione una opción '.green);
    console.log('==========================\n'.green);

    //Opciones del menu mostradas en consola
    const { opcion } = await prompt(preguntas) // name: 'opcion', de la variable preguntas
    return opcion
}

// ======================================
//Funcion para pausar la consola ========
// ======================================
const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ]

    console.log('\n');
    await prompt(question)
}

// ======================================
//Funcion para leer un input ============
// ======================================
const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }
    ]

    const { desc } = await prompt(question)
    return desc
}


// ========================================
// Funcion para listar las tareas a borrar
// ========================================
const listarLugares = async (lugares = []) => {

    //Extrayendo las tareas del listado
    const choices = lugares.map((lugar, i) => {

        const idx = `${i + 1}.`.green

        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    })

    //Añadiendo la opcion de cancelar
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    //Configurando las preguntas
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:'.green,
            choices
        }
    ]

    //Opciones del menu mostradas en consola
    const { id } = await prompt(preguntas)
    return id
}


// ========================================
// Funcion para confirmar una accion ======
// ========================================
const confirmar = async (message) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await prompt(pregunta)
    return ok
}


// ========================================
// Funcion para listar las tareas a borrar
// ========================================
const mostrarListadoCheckList = async (tareas = []) => {

    //Extrayendo las tareas del listado
    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.green

        return {
            value: tarea.idTarea,
            name: `${idx} ${tarea.descripcion}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })


    //Configurando las preguntas
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    //Opciones del menu mostradas en consola
    const { ids } = await prompt(pregunta)
    return ids
}



// ========================================
// Exportar modulo ========================
// ========================================
module.exports = {
    inquireMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheckList
}