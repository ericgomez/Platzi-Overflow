'use strict'

const Joi = require('joi');
const site = require('./controllers/site')
const user = require('./controllers/user')

module.exports = [
    // DEFINICIÓN DE RUTAS SE INDICA EL MÉTODO HTTP, URL Y CONTROLADOR/handler DE RUTA
    // SE DECLARAN DESPUÉS DEL PLUGIN YA QUE LAS RUTAS HACEN USO DEL MISOM PARA DEVOLVER ARCHIVOS ESTATICOS
    {
      method: 'GET',
      path: '/',
      handler: site.home
    },
  /**
     * Rutas para el registro de usuarios
     * 
     * el objeto request permite recuperar los datos de la petición. 
     * sus propiedades son path, method, 
     * params, query, get, payload (PUT/POST)
     * 
     * El objeto request tiene un ciclo de vida en HapiJS
     */
  {
    method: 'GET',
    path: '/register',
    handler: site.register
  },
  {
    method: 'POST',
    options: {
      validate: {
        payload: Joi.object(
          {
            name: Joi.string().required().min(3),
            email: Joi.string().email().required(),
            password: Joi.string().required().min(6)
          }
        )
      }
    },
    path: '/create-user',
    handler: user.createUser
  },

  // RUTA PARA SERVIR ARCHIVOS ESTÁTICOS ASOCIADOS (IMG/CSS/JS)
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        index: ['index.html']
      }
    }
  }
]