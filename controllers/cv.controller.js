const CV = require('../models/cv.model');

exports.crearCV = async (req, res) => {
  try {
    const nuevoCV = await CV.create(req.body);
    res.status(201).json(nuevoCV);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerCVs = async (req, res) => {
  try {
    const cvs = await CV.find();
    res.status(200).json(cvs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
