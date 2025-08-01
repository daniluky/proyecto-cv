const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cvRoutes = require('./routes/cv.routes');
const adminRoutes = require('./routes/admin.routes');
const publicRoutes = require('./routes/public.routes');
const cors = require('cors');
const path = require('path');


dotenv.config();
const app = express();

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use('/api/cv', cvRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);

// SERVIR FRONTEND EN PRODUCCIÓN
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

app.get(/^\/(?!api|admin).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

module.exports = app;
