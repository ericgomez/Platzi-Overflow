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
    console.log(`Usuario registrado ${createUserId}`)
    return h.view('register', {
      title: 'Registro',
      success: 'Usuario creado exitosamente'
    })
  } catch (error) {
    console.error(error)
    return h.view('register', {
      title: 'Registro',
      error: 'Error creando el usuario'
    })
  }
}

async function validateUser(req, h) {
  try {
    const userLogin = await users.validateUser(req.payload)

    if (!userLogin) {
      return h.view('login', {
        title: 'Login',
        error: 'Email y/o contraseña incorrecta'
      })
    }

    // En aplicaciones Web, las cookies se usan a menudo para mentener el estado de un usuario entre solicitudes http

    // Se redirecciona al usuario y se le envía la cookie llamada user configurara previamente en la aplicacion (nombreCookie, data)
    return h.redirect('/').state('user', {
      name: userLogin.name,
      email: userLogin.email,
    })

  } catch (error) {
    console.error(error)
    return h.view('login', {
      title: 'Login',
      error: 'Problemas validando el usuario'
    })
  }
}

// Funclion de Cerrar Sesion
function logout(req, h) {
  // Con unstate removemos la Cookie por el nombre
  return h.redirect('/login').unstate('user')
}

function failValidation (req, h, err) {
  const templates = {
    '/create-user': 'register',
    '/validate-user': 'login'
  }

  // reutilizo la misma vista para los templates con templates[req.path]
  return h.view(templates[req.path], {
    title: 'Error de validación',
    error: 'Por favor complete los campos requeridos'
  }).code(400).takeover() // Se requiere el .takeover() para retornar directamente el mensaje
}

module.exports = {
  createUser: createUser,
  validateUser: validateUser,
  failValidation: failValidation,
  logout: logout
}