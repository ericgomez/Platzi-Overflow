'use strict'

const { questions } = require('../models/index')

async function createQuestion (req, h) {
  try {
    // Realizamos la destructuracion de la pregunta para eliminar [Object: null prototype]
    const question = { ...req.payload}
    
    const result = await questions.create(question, req.state.user)
    console.log(`Pregunta creada con el ID ${result}`)

    return h.response(`Pregunta creada con el ID ${result}`)
  } catch (error) {
    console.error(`Ocurrio un error: ${error}`)

    return h.view('ask', {
      title: 'Crear pregunta',
      error: 'Problemas creando la pregunta'
    }).code(500).takeover()
  }
}

module.exports = {
  createQuestion: createQuestion
}