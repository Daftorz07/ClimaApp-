# ClimaApp 🌦️

**ClimaApp** es una aplicación de Node.js diseñada como ejercicio del [Curso de NodeJS de Fernando Herrera](https://www.udemy.com/course/node-de-cero-a-experto/), en la que se consumen dos APIs para obtener información climática en tiempo real. A partir del nombre de una ciudad, la aplicación identifica su localización geográfica y, con estas coordenadas, obtiene la temperatura actual de dicha ciudad.

## Tecnologías usadas
La aplicación utiliza las siguientes tecnologías y dependencias de Node.js:

- [Request](https://www.npmjs.com/package/request): para realizar solicitudes HTTP.
- [Fetch](https://www.npmjs.com/package/fetch): otra opción para realizar solicitudes HTTP.
- [Axios](https://www.npmjs.com/package/axios): una alternativa popular y robusta para las solicitudes HTTP.

## APIs usadas
Para cumplir con sus funcionalidades, **ClimaApp** hace uso de las siguientes APIs:

1. **API de Localización**: se usa para identificar la ubicación de una ciudad mediante su nombre.
2. **API de Clima**: obtiene la temperatura actual de la ciudad a partir de las coordenadas geográficas proporcionadas.

Para pruebas rápidas de los endpoints, puedes utilizar:
- [Reqres](https://reqres.in/): un API REST gratuito para realizar pruebas rápidas.

## Configuración
Para ejecutar este proyecto en tu entorno local, sigue los siguientes pasos:



La aplicacion utilizada variables de entorno para las credenciales de la aplicacion, MAPBOX_KEY y OPENWEATHER_KEY

