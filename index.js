'use strict'

const Hapi = require('@hapi/hapi')
const inert = require('@hapi/inert')
const vision = require('@hapi/vision')
const path = require('path')
const routes = require('./routes')
const site = require('./controllers/site')
const handlebars = require('./lib/helpers')
const methods = require('./lib/methods')

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  // SE DECLRAR LA VARIABLE/OBJETO PARA DECLRAR LA RUTA A LA CARPETA DE ARCHIVOS ESTATICOS
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'public')
    }
  }
})

async function init () {
  try {
    // REGISTRAR LOS PLUGINS QUE HAPI VA A NECESITAR PARA SERVIR ARCHIVOS ESTATICOS
    await server.register(inert)
    await server.register(vision)// Registrar plugin para gestionar el motor de plantillas
    await server.register({
      plugin: require('@hapi/good'),
      options: {
        reporters: {
          console: [
            {
              module: require('@hapi/good-console'),
            },
            'stdout'
          ]
        }
      }
    })

    // Registramos nuestro plugin en este caso: api
    await server.register({
      plugin: require('./lib/api'),
      options: {
        prefix: 'api' // prefix puede ser otro valor, el resultado es http://localhost:3000/api
      }
    })

    server.method('setAnswerRight', methods.setAnswerRight)
    server.method('getLast', methods.getLast, {
      cache: {
        expiresIn: 1000 * 60,
        generateTimeout: 2000
      }
    })
    
    // Configurar el servidor para el envio de cookies (nombreCookie, opciones)
    // https://hapi.dev/tutorials/cookies/?lang=en_US
    // tiempo de vida de la cookie (en milisegundos)
    // localhost no es seguro
    // codificación de la cookie
    server.state('user', {
      ttl: 1000 * 60 * 60 * 24 * 7, //timeToLive por una semana
      isSecure: process.env.NODE_ENV === 'prod',
      encoding: 'base64json'
    })

    // Configurar nuestro motor de plantillas. Usará handlebars y cuando invoquemos una vista automáticamente buscará una con extensión hbs (no hace falta especificarlo). Debe buscar a partir del directorio actual, las vistas se encuentran en views y se activa compatibilidad con layouts, los cuales se encuentran en layouts
    server.views({
      engines: { // --- hapi puede usar diferentes engines
        hbs: handlebars // --- asociamos el plugin al tipo de archivos  
      },
      relativeTo: __dirname, // --- para que las vistas las busque fuera de /public
      path: 'views', // --- directorio donde colocaremos las vistas dentro de nuestro proyecto
      layout: true, // --- indica que usaremos layouts 
      layoutPath: 'views' // --- ubicación de los layouts
    })

    // Utilizamos la rutas en el sevidor
    server.ext('onPreResponse', site.fileNotFound)
    server.route(routes)

    await server.start()
  } catch (error) {
    server.log('error',error)
    process.exit(1)
  }

  server.log('info', `Servidor lanzado en: ${server.info.uri}`)
}

// Controlamos los Errores a nivel de proceso
process.on('unhandledRejection', error => {
  server.log('UnhandledRejection', error.message, error)
})
// Controlamos excepciones a nivel de proceso
process.on('unhandledException', error => {
  server.log('unhandledException', error.message, error)
})

init()
