const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotaSchema = new Schema({
  codigoDisciplina: {
    type: Number,
    required: true,
    unique: true
  },
  nomeProfessor: {
    type: String,
    required: true
  },
  nomeDisciplina: {
    type: String,
    required: true
  },
  nota: {
    type: Number,
    required: true,
    min: 0,
    max: 20
  }
}
);

module.exports = mongoose.model('Nota', NotaSchema);
