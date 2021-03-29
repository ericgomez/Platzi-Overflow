'use strict'

const Hapi = require('@hapi/hapi')
const inert = require('@hapi/inert')
const vision = require('@hapi/vision')
const path = require('path')
const routes = require('./routes')
const handlebars = require('handlebars')

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
    server.route(routes)

    await server.start()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  console.log(`Servidor lanzado en: ${server.info.uri}`)
}

init()
