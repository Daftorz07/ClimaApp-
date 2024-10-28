
const fs = require('fs');
const axios = require('axios');

class Busqueda {


    //======================================================
    // Propiedades de la clase =============================
    //======================================================
    historial = [];
    doPath = './db/data.json';

    constructor() {
        //Leer la DB si existe
        this.leerDB();
    }

    get historialCapitalizado() {
        return this.historial.map(lugar => {
            let palabras = lugar.split(', ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1))
            return palabras.join(', ');
        });
    }

    get paramsMapbox() {
        return {
            'language': 'es',
            'proximity': 'ip',
            access_token: process.env.MAPBOX_KEY
        }

    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    //======================================================
    // Metodo para buscar la ciudad ========================
    //======================================================
    async buscarCiudad(ciudad = '') {

        try {

            //Instanciar axios con la configuracion
            const intance = axios.create(
                {
                    baseURL: `https://api.mapbox.com/search/geocode/v6/forward?q=${ciudad}`,
                    params: this.paramsMapbox
                }
            )

            //Peticion HTTP
            const resp = await intance.get()

            // console.log(resp.data.features);

            //Extraer los datos
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.properties.full_address,
                lng: lugar.geometry.coordinates[0],
                lat: lugar.geometry.coordinates[1],
            }))


        } catch (error) {
            return []
        }
    }

    //======================================================
    // Metodo para buscar clima en la ciudad ===============
    //======================================================
    async climaLugar(lat, lon) {

        try {
            //Instanciar axios con la configuracion
            const intance = axios.create(
                {
                    baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                    params: { ...this.paramsOpenWeather, lat, lon }
                }
            )

            //Peticion HTTP
            const resp = await intance.get()
            const { weather, main } = resp.data

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {

            console.log('No se pudo obtener el clima', error);

        }
    }

    //======================================================
    //Metodo para guardar historial ========================
    //======================================================
    agregarHistorial(lugar = '') {

        //Prevenir duplicados
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }

        //Limitar el historial
        this.historial = this.historial.splice(0, 10)

        //Agregar al inicio del array
        this.historial.unshift(lugar.toLocaleLowerCase())

        //Guardar en DB
        this.guardarDB()

    }

    //======================================================
    //Metodo para guardar historial en DB ==================
    //======================================================
    guardarDB() {

        //Datos a guardar
        const payload = {
            historial: this.historial
        }

        //Escribir en el archivo
        fs.writeFileSync(this.doPath, JSON.stringify(payload))
    }

    //======================================================
    //Metodo para leer DB ==================================
    //======================================================
    leerDB() {

        //Comprobar si el archivo existe
        if (!fs.existsSync(this.doPath)) {
            return null;
        }

        //Leer el archivo
        const info = fs.readFileSync(this.doPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);

        //Cargar el historial en el arreglo
        this.historial = data.historial
    }
}

module.exports = Busqueda;