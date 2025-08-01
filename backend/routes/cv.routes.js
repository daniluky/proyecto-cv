const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cv.controller');

router.post('/', cvController.crearCV);
router.get('/:id', cvController.getCVById);
router.put('/:id', cvController.updateCV);
router.get('/:id/pdf', cvController.descargarCVenPDF);

module.exports = router;

