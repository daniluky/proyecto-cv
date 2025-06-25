const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cvRoutes = require('./routes/cv.routes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/cv', cvRoutes);

module.exports = app;
