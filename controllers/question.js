'use strict'

const { writeFile, mkdirSync } = require('fs')
const { promisify } = require('util')
const { join } = require('path')
const { questions } = require('../models/index')
const {v1: uuid} = require('uuid') // uuid  para manejar nuestros propios nombres de archivo internamente y evitar la duplicidad.

const write = promisify(writeFile)

async function createQuestion (req, h) {
  if (!req.state.user) {
    return h.redirect('/login')
  }

  try {
    // Realizamos la destructuracion de la pregunta para eliminar [Object: null prototype]
    const question = { ...req.payload }

    let filename
    if (Buffer.isBuffer(question.image)) {
      filename = `${uuid()}.png`

      // Creamos la carpeta uploads si no existe 
      mkdirSync(`${__dirname}/../public/uploads`,{recursive:true});
       // Agregamos la imagen en la carpeta el uploads
      await write(join(__dirname, '..', 'public', 'uploads', filename), question.image)
    }

    const result = await questions.create(question, req.state.user, filename)
    console.log(`Pregunta creada con el ID ${result}`)

    return h.redirect(`/question/${result}`)
  } catch (error) {
    console.error(`Ocurrio un error: ${error}`)

    return h.view('ask', {
      title: 'Crear pregunta',
      error: 'Problemas creando la pregunta'
    }).code(500).takeover()
  }
}

async function answerQuestion (req, h) {
  if (!req.state.user) {
    return h.redirect('/login')
  }

  let result
  try {
    result = await questions.answer(req.payload, req.state.user)
    console.log(`Respuesta creada: ${result}`)
  } catch (error) {
    console.error(error)
  }

  return h.redirect(`/question/${req.payload.id}`)
}

async function setAnswerRight (req, h) {
  if (!req.state.user) {
    return h.redirect('/login')
  }

  try {
    const result = await req.server.methods.setAnswerRight(req.params.questionId, req.params.answerId, req.state.user)
    console.log(result)
    return h.redirect(`/question/${req.params.questionId}`)
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  answerQuestion: answerQuestion,
  setAnswerRight: setAnswerRight,
  createQuestion: createQuestion
}