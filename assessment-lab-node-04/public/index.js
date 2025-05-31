const mongoose = require('mongoose')
const NotasModel = require('../models/notas')

const mongoURI = 'mongodb+srv://bro:bro@lab-node-03.xkde5ma.mongodb.net/?retryWrites=true&w=majority&appName=lab-node-03'

mongoose.connect(mongoURI)
  .then(()=> console.log('MongoDB conectado com sucesso'))
  .catch(err => console.log('MongoDB erro: ', err))
