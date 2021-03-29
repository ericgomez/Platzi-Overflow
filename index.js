'use strict'

const Hapi = require('@hapi/hapi')
const inert = require('@hapi/inert')
const path = require('path')

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

    // DEFINICIÓN DE RUTAS SE INDICA EL MÉTODO HTTP, URL Y CONTROLADOR/handler DE RUTA
    // SE DECLARAN DESPUÉS DEL PLUGIN YA QUE LAS RUTAS HACEN USO DEL MISOM PARA DEVOLVER ARCHIVOS ESTATICOS
    server.route({
      method: 'GET',
      path: '/home',
      handler: (request, h) => {
        // POR EL INERT SE TIENEN ACCESO AL METODO h.file()
        return h.file('index.html')
      }
    })

    // RUTA PARA SERVIR ARCHIVOS ESTÁTICOS ASOCIADOS (IMG/CSS/JS)
    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '.',
          index: ['index.html']
        }
      }
    })

    await server.start()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  console.log(`Servidor lanzado en: ${server.info.uri}`)
}

init()
