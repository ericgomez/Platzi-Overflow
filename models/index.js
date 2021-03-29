'use strict'

// Información de configuración proporcionada en 
// NombreProyectoFirebase -> configuración del proyecto -> cuentas del servicio

const firebase = require('firebase-admin')
// Exportamos el archivo json con el Key de SDK de Firebase Admin 
const serviceAccount = require('../config/firebase.json')

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://platzioverflow-543c4-default-rtdb.firebaseio.com/'
})

// Crear una instancia (referencia) de la base de datos
const db = firebase.database()

// Importar modulos (CLASES) correspondientes a los modelos de la base de datos
const Users = require('./users')

// Recordar que los modelos esperan como parámetro una referencia hacia la base de datos.
// Exportamos las instancias de los modelos listas para ser invocadas en los controladores correspondientes
module.exports = {
  users: new Users(db)
}