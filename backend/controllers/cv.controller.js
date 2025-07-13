const cvService = require('../services/cv.service');
const CV = require('../models/cv.model');
const pdfService = require('../services/pdf.services');


exports.crearCV = async (req, res) => {
  try {
    const nuevoCV = await cvService.crearCV(req.body);
    res.status(201).json(nuevoCV);
  } catch (error) {
    console.error('❌ Error al crear CV:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerCVs = async (req, res) => {
  try {
    const cvs = await cvService.obtenerCVs();
    res.status(200).json(cvs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.obtenerTodosLosCVs = async (req, res) => {
  try {
    const cvs = await cvService.obtenerTodosLosCVs();
    res.status(200).json(cvs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarCV = async (req, res) => {
  try {
    await cvService.eliminarCV(req.params.id);
    res.json({ mensaje: 'CV eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.descargarCVenPDF = async (req, res) => {
  try {
    const cv = await CV.findById(req.params.id);
    if (!cv) return res.status(404).json({ error: 'CV no encontrado' });

    pdfService.generarCVenPDF(cv, res); // envía el PDF directamente
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};