const express = require('express');
const router = express.Router();
const publicController = require('../controllers/public.controller');


router.post('/login', publicController.loginPublico);

module.exports = router;
