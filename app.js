//Variables de entorno
require('dotenv').config();


const {
    leerInput,
    pausa,
    inquireMenu,
    listarLugares
} = require("./helpers/inquirer");

const Busqueda = require("./models/busquedas");
const colors = require('colors');


const main = async () => {

    const busqueda = new Busqueda();

    let opcion = 0;



    do {

        opcion = await inquireMenu();


        switch (opcion) {
            case 1:

                //Mostrar el mensaje
                const terminoBusqueda = await leerInput('Ciudad: ')

                //Buscar los lugares 
                const lugares = await busqueda.buscarCiudad(terminoBusqueda);

                //Seleccionar el lugar/ciudad
                const idSelecionado = await listarLugares(lugares);

                //Validar el id seleccionado o cancelar
                if (idSelecionado === '0') continue;

                const lugarSeleccionado = lugares.find(lugar => lugar.id === idSelecionado);

                //Guardar en DB
                busqueda.agregarHistorial(lugarSeleccionado.nombre);



                //Datos del clima
                const clima = await busqueda.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);

                //Mostrar el resultado
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log(`Ciudad: ${lugarSeleccionado.nombre}`);
                console.log(`Lat: ${lugarSeleccionado.lat}`);
                console.log(`Lng: ${lugarSeleccionado.lng}`);
                console.log(`Como esta el clima: ${clima.desc}`);
                console.log(`Tem Max: ${clima.max}`);
                console.log(`Tem Min: ${clima.min}`);
                console.log(`Temperatura: ${clima.temp}`);

                break;

            case 2:

                busqueda.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green
                    console.log(`${idx} ${lugar}`);
                })
                break;

            case 0:
                console.log("Opcion 0: Salir");
                break;
        }

        if (opcion !== 0) await pausa();

    } while (opcion !== 0);
}

main();

