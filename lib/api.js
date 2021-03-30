'use strict'

const authBasic = require('@hapi/basic')
const Boom = require('@hapi/boom')
const Joi = require('joi')
const { questions } = require('../models/index')
const { users } = require('../models/index')

// Creacion del plugin

module.exports = {
  name: 'api-rest',
  version: '1.0.0',
  async register (server, options) {
    const prefix = options.prefix || 'api' // Ejemplo: http://localhost:3000/api/

    await server.register(authBasic)
    server.auth.strategy('simple', 'basic', { validate })
    server.auth.default('simple')

    /* ------ RUTAS -----------*/

    //Ejemplo de la ruta: http://localhost:3000/api/question/-MX423PRc70kBey-T7h_
    server.route({
      method: 'GET',
      path: `/${prefix}/question/{key}`,
      options: {
        validate: {
          params: Joi.object(
            {
              key: Joi.string().required()
            }
          ),
          failAction: failValidation
        }
      },
      handler: async (req, h) => {
        let result
        try {
          result = await questions.getOne(req.params.key)
          if (!result) {
            return Boom.notFound(`No se pudo encontrar la pregunta ${req.params.key}`)
          }
        } catch (error) {
          return Boom.badImplementation(`Hubo un error buscando ${req.params.key} - ${error}`)
        }

        return result
      }
    })

    // Lista las preguntas
    // Ejemplo de la ruta: http://localhost:3000/api/questions/3
    server.route({
      method: 'GET',
      path: `/${prefix}/questions/{amount}`,
      options: {
        validate: {
          params: Joi.object(
            {
              amount: Joi.number().integer().min(1).max(20).required()
            }
          ),
          failAction: failValidation
        }
      },
      handler: async (req, h) => {
        let result
        try {
          result = await questions.getLast(req.params.amount)
          if (!result) {
            return Boom.notFound(`No se pudo recuperar las preguntas`)
          }
        } catch (error) {
          return Boom.badImplementation(`Hubo un error buscando las preguntas - ${error}`)
        }

        return result
      }
    })

    // En caso de que no se haga march con las rutas definidas
    function failValidation (req, h, err) {
      return Boom.badRequest('Por favor use los parámetros correctos')
    }

    async function validate (req, username, password, h) {
      let user
      try {
        user = await users.validateUser({ email: username, password: password })
      } catch (error) {
        server.log('error', error)
      }

      return {
        credentials: user || {},
        isValid: (user !== false)
      }
    }
  }
}
