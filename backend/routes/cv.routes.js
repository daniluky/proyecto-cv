const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cv.controller');

router.post('/', cvController.crearCV);
router.get('/', cvController.obtenerCVs);

module.exports = router;

