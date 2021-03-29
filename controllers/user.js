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

async function validateUser(req, h) {
  try {
    const userLogin = await users.validateUser(req.payload)

    if (!userLogin) {
      return h.response('Email y/o Contraseña incorrectas').code(401)
    }

    // En aplicaciones Web, las cookies se usan a menudo para mentener el estado de un usuario entre solicitudes http

    // Se redirecciona al usuario y se le envía la cookie llamada user configurara previamente en la aplicacion (nombreCookie, data)
    return h.redirect('/').state('user', {
      name: userLogin.name,
      email: userLogin.email,
    })

  } catch (error) {
    console.error(error)
    return h.response('Problemas al logear el usuario').code(500)
  }
}

// Funclion de Cerrar Sesion
function logout(req, h) {
  // Con unstate removemos la Cookie por el nombre
  return h.redirect('/login').unstate('user')
}

module.exports = {
  createUser: createUser,
  validateUser: validateUser,
  logout: logout
}