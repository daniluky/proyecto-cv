const CV = require('../models/cv.model');

const crearCV = async (data) => {
  const nuevoCV = await CV.create({
    ...data
  });
  return { cv: nuevoCV };
};


const obtenerTodosLosCVs = async () => {
  return await CV.find();
};

const eliminarCV = async (id) => {
  await CV.findByIdAndDelete(id);
};

const actualizarCV = async (id, datosActualizados) => {
  const cvActualizado = await CV.findByIdAndUpdate(id, datosActualizados, {
    new: true, // devuelve el documento actualizado
    runValidators: true // aplica validaciones del schema
  });
  return cvActualizado;
};

const obtenerCVPorId = async (id) => {
  const cv = await CV.findById(id);
  return cv;
};

module.exports = { crearCV, obtenerTodosLosCVs, eliminarCV, actualizarCV, obtenerCVPorId };
