'use strict'

// Importar el archivo de conexión a la base de datos
const { users } = require('../models/index')


/**
 * Controlador encargado de registrar un usuario en la base de datos.
 * La base de datos se encuentra en un servicio desentralizado (Firebase) que retonra una promesa.
 */
 async function createUser (req, h) {
  try {
    // Mostrar en consola el cuerpo de la petición el req tiene la propiedad payload
    const createUserId = await users.create(req.payload)
    return h.response(`Usuario registrado satisfactoriamente con el ID ${createUserId}`).code(201)
  } catch (error) {
    console.error(error)
    return h.response('Problemas al registrar el usuario').code(500)
  }
}

module.exports = {
  createUser: createUser
}