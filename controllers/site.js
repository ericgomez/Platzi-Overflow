'use strict'

function home (request, h) {
  // El plugin de vision inyecta el metodo view al objeto h para renderizar una vista que seria index.hbs
  return h.view('index', {
    // El plugin de vision inyecta los parametros que requiere el layout.hbs
    title: 'Home'
  })
}

function register (req, h) {
  // El plugin de vision inyecta el metodo view al objeto h para renderizar una vista que seria register.hbs
  return h.view('register', {
    // El plugin de vision inyecta los parametros que requiere el layout.hbs
    title: 'Registro'
  })
}

module.exports = {
  home: home,
  register: register
}