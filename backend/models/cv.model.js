const mongoose = require('mongoose');

const experienciaSchema = new mongoose.Schema({
  empresa: String,
  cargo: String,
  fechaInicio: Date,
  fechaFin: Date,
  descripcion: String,
  habilidades: [String]
}, { _id: false })

const educacionSchema = new mongoose.Schema({
  institucion: String,
  titulo: String,
  fechaInicio: Date,
  fechaFin: Date,
  descripcion: String
}, { _id: false })

const cvSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  fechaNacimiento: Date,
  telefono: String,
  ciudad: String,
  experiencia: [experienciaSchema],
  educacion: [educacionSchema],
  habilidades: [String],
  idiomas: [String],
  adminId: String
}, { timestamps: true });

module.exports = mongoose.model('CV', cvSchema, 'cvs');