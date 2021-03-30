'use strict'

const { questions } = require('../models/index')

async function home (req, h) {
  const data = await req.server.methods.getLast(10)
  
  // El plugin de vision inyecta el metodo view al objeto h para renderizar una vista que seria index.hbs
  return h.view('index', {
    // El plugin de vision inyecta los parametros que requiere el layout.hbs
    title: 'Home',
    user: req.state.user,
    questions: data
  })
}

function register (req, h) {
  // Validamos si el usuario tiene estado:logeado solo lo redireccionamos
  if (req.state.user) {
    return h.redirect('/')
  }
  
  // El plugin de vision inyecta el metodo view al objeto h para renderizar una vista que seria register.hbs
  return h.view('register', {
    // El plugin de vision inyecta los parametros que requiere el layout.hbs
    title: 'Registro',
    user: req.state.user
  })
}

/**
 * Controladores encargados de mostrar la vista de login (formulario)
 * Procesar la data del usuario para verificar que sus credenciales de acceso sean las correctas
 * Leer en la base de datos (Firebase)
 */
 function login(req, h) {
  // Validamos si el usuario tiene estado:logeado solo lo redireccionamos
  if (req.state.user) {
    return h.redirect('/')
  }

  return h.view('login', {
     title: 'Login',
     user: req.state.user
  })
}

async function viewQuestion (req, h) {
  let data
  try {
    data = await questions.getOne(req.params.id)
    if (!data) {
      return notFound(req, h)
    }
  } catch (error) {
    req.log('error', error)
  }

  return h.view('question', {
    title: 'Detalles de la pregunta',
    user: req.state.user,
    question: data,
    key: req.params.id
  })
}

// Ruta no encontrada
function notFound (req, h) {
  return h.view('404', {}, { layout: 'error-layout' }).code(404)
}

function fileNotFound (req, h) {
  const response = req.response
  if (response.isBoom && response.output.statusCode === 404) {
    return h.view('404', {}, { layout: 'error-layout' }).code(404)
  }

  // con el methodo continue continuamos el funcionamiento si la condicion anterior no se cumple
  return h.continue
}

function ask (req, h) {
  if (!req.state.user) {
    return h.redirect('/login')
  }

  return h.view('ask', {
    title: 'Crear pregunta',
    user: req.state.user
  })
}

module.exports = {
  home: home,
  ask: ask,
  fileNotFound: fileNotFound,
  register: register,
  notFound: notFound,
  viewQuestion: viewQuestion,
  login: login
}