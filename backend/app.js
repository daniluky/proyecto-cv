const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cvRoutes = require('./routes/cv.routes');
const adminRoutes = require('./routes/admin.routes');
const publicRoutes = require('./routes/public.routes');
const cors = require('cors');

dotenv.config();
const app = express();

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use('/api/cv', cvRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);

module.exports = app;
