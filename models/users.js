'use strict'

const bcrypt = require('bcrypt')

/**
 * Clase compatible con Firebase Data Base
 */

class Users {
  // La clase recibe una referencia hacia la base de datos de firebase donde se guardará la información
  constructor (db) {
    this.db = db
    this.ref = this.db.ref('/')
    this.collection = this.ref.child('users')
  }

  // Método de clase para guardar un usuario en la base de datos de firebase
  async create (data) {

    // Destructuro el objeto con el payload enviado. Ya que Hapi lo decora con un prototipo null que no es compatible con Firebase
    const user = {
      ...data
    }

    // Se genera una contraseña encriptada a partir de la proporcionada. this.constructor llama a la clase, ya que el método encrypt es estático
    user.password = await this.constructor.encrypt(user.password)

    const newUser = this.collection.push(user)

    // Retornamos el id del usuario
    return newUser.key
  }

  // Metodo de clase para recuperar a un usuario si las credenciales de acceso son correctas
  async validateUser(data) {
    // Ordenar la colección por email, consultar el usuario por su email (no me interesa escuchar cambios en la data, por ello once)
    const queryUser = await this.collection.orderByChild("email").equalTo(data.email).once("value")
    // Obtengo el objeto con los resultados de mi consulta {objId: {}, objId: {}, objId: {}}
    const userFound = queryUser.val()
    if (userFound) {
      // Obtengo un arreglo con los ids de los documentos que forman parte de los resultados de mi busqueda. Me interesa quedarme con el elemento (ObjectId) del primer documento, mas no con el arreglo
      const userId = Object.keys(userFound)[0]
      // comparar si las contraseñas son correctas {documentoResultado.objectId.password}
      const passwordRight = await bcrypt.compare(data.password, userFound[userId].password)
      // Retornamos el resultado
      return (passwordRight) ? userFound[userId] : false;
    }
    // Si no se encontro ningun usuario retornamos false
    return false
  }

  // Método estático asincrono para la encriptacion de contraseñas
  static async encrypt (passwd) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(passwd, saltRounds)
    return hashedPassword
  }
}

module.exports = Users