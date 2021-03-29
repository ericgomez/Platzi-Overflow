'use strict'

const Hapi = require('@hapi/hapi')

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost'
})

async function init () {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      // h.response(): Crea un objeto de respuesta.
      return h.response('Hola Mundo ...').code(200)
    }
  })

  server.route({
    method: 'GET',
    path: '/redirect',
    handler: (request, h) => {
      // h.redirect(): Redirecciona una petición.
      return h.redirect('http://platzi.com')
    }
  })

  try {
    await server.start()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  console.log(`Servidor lanzado en: ${server.info.uri}`)
}

init()
