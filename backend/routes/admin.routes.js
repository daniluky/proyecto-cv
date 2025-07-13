const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cv.controller');
const adminController = require('../controllers/admin.controller');
const { authMiddleware } = require('../Middlewares/auth.middleware');

router.post('/login', adminController.login);
router.get('/cvs', authMiddleware, cvController.obtenerTodosLosCVs);
router.delete('/cv/:id', authMiddleware, cvController.eliminarCV);
router.get('/cv/:id/pdf', authMiddleware, cvController.descargarCVenPDF);
router.post('/logout', adminController.logout);



module.exports = router;
