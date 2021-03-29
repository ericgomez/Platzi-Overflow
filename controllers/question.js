'use strict'

const { questions } = require('../models/index')

async function createQuestion (req, h) {
  try {
    const result = await questions.create(req.payload, req.state.user)
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