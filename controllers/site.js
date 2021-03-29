'use strict'

function home (req, h) {
  // El plugin de vision inyecta el metodo view al objeto h para renderizar una vista que seria index.hbs
  return h.view('index', {
    // El plugin de vision inyecta los parametros que requiere el layout.hbs
    title: 'Home',
    user: req.state.user
  })
}

function register (req, h) {
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
  return h.view('login', {
     title: 'Login',
     user: req.state.user
  })
}

module.exports = {
  home: home,
  register: register,
  login: login
}