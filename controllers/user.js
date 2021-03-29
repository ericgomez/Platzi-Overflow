'use strict'

function createUser (req, h) {
  // Mostrar en consola el cuerpo de la petición el req tiene la propiedad payload
  console.log(req.payload)
  return 'Usuario creado satisfactoriamente'
}

module.exports = {
  createUser: createUser
}