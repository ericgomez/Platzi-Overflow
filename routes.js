'use strict'

const Joi = require('joi');
const site = require('./controllers/site')
const user = require('./controllers/user')
const question = require('./controllers/question')

module.exports = [
    // DEFINICIÓN DE RUTAS SE INDICA EL MÉTODO HTTP, URL Y CONTROLADOR/handler DE RUTA
    // SE DECLARAN DESPUÉS DEL PLUGIN YA QUE LAS RUTAS HACEN USO DEL MISOM PARA DEVOLVER ARCHIVOS ESTATICOS
    {
      method: 'GET',
      path: '/',
      options: {
        cache: {
          expiresIn: 1000 * 30,
          privacy: 'private'
        }
      },
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
    path: '/create-user',
    options: {
      validate: {
        payload: Joi.object(
          {
            name: Joi.string().required().min(3),
            email: Joi.string().email().required(),
            password: Joi.string().required().min(6)
          }
        ),
        failAction: user.failValidation
      }
    },
    handler: user.createUser
  },
  {
    method: 'GET',
    path: '/login',
    handler: site.login
  },
  {
    method: 'GET',
    path: '/question/{id}',
    handler: site.viewQuestion
  },
  {
    method: 'GET',
    path: '/logout',
    handler: user.logout
  },
  {
    method: 'GET',
    path: '/ask',
    handler: site.ask
  },
  {
    method: 'POST',
    path: '/validate-user',
    options: {
      validate: {
        payload: Joi.object(
          {
            email: Joi.string().email().required(),
            password: Joi.string().required().min(6)
          }
        ),
        failAction: user.failValidation
      }
    },
    handler: user.validateUser
  },
  {
    path: '/create-question',
    method: 'POST',
    options: {
      payload: {
        multipart: true,
      },
      validate: {
        payload: Joi.object(
          {
            title: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.any().optional()
          }
        ),
        failAction: user.failValidation
      }
    },
    handler: question.createQuestion
  },
  {
    path: '/answer-question',
    method: 'POST',
    options: {
      validate: {
        payload: Joi.object(
          {
            answer: Joi.string().required(),
            id: Joi.string().required()
          }
        ),
        failAction: user.failValidation
      }
    },
    handler: question.answerQuestion
  },
  {
    method: 'GET',
    path: '/answer/{questionId}/{answerId}',
    handler: question.setAnswerRight
  },

  // RUTA PARA SERVIR ARCHIVOS ESTÁTICOS ASOCIADOS (IMG/CSS/JS)
  {
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: '.',
        index: ['index.html']
      }
    }
  },

  // Ultima ruta
  // Ruta del catch de page 404
  {
    method: ['GET', 'POST'],
    path: '/{any*}',
    handler: site.notFound
  }
]