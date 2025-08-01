const cvService = require('../services/cv.service');
const CV = require('../models/cv.model');
const pdfService = require('../services/pdf.services');
const mongoose = require('mongoose');


const crearCV = async (req, res) => {
  try {
    const nuevoCV = await cvService.crearCV(req.body);
    res.status(201).json(nuevoCV);
  } catch (error) {
    console.error('❌ Error al crear CV:', error);
    res.status(500).json({ error: error.message });
  }
};


const obtenerTodosLosCVs = async (req, res) => {
  try {
    const cvs = await cvService.obtenerTodosLosCVs();
    res.status(200).json(cvs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarCV = async (req, res) => {
  try {
    await cvService.eliminarCV(req.params.id);
    res.json({ mensaje: 'CV eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const descargarCVenPDF = async (req, res) => {
  try {
    const cv = await CV.findById(req.params.id);
    if (!cv) return res.status(404).json({ error: 'CV no encontrado' });

    pdfService.generarCVenPDF(cv, res); // envía el PDF directamente
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateCV = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const cvActualizado = await CV.findByIdAndUpdate(id, datosActualizados, {
      new: true,
      runValidators: true
    });

    if (!cvActualizado) {
      return res.status(404).json({ message: 'CV no encontrado' });
    }

    res.status(200).json(cvActualizado);
  } catch (error) {
    console.error('Error al actualizar el CV:', error);
    res.status(500).json({ message: 'Error al actualizar el CV', error });
  }
};

const getCVById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const cv = await cvService.obtenerCVPorId(id);

    if (!cv) {
      return res.status(404).json({ message: 'CV no encontrado' });
    }

    res.status(200).json(cv);
  } catch (error) {
    console.error('Error al obtener el CV por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  crearCV,
  obtenerTodosLosCVs,
  eliminarCV,
  descargarCVenPDF,
  updateCV,
  getCVById
};
