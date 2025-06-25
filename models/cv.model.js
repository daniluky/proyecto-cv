const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  experiencia: String,
  educacion: String,
  habilidades: [String],
  idiomas: [String]
}, { timestamps: true });

module.exports = mongoose.model('CV', cvSchema);