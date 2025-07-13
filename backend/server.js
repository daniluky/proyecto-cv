const app = require('./app');
const connectDB = require('./config/db');
const cors = require('cors'); 

const PORT = process.env.PORT || 5050;

// Configurar CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});