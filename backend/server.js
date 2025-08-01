const app = require('./app');
const connectDB = require('./config/db');
const cors = require('cors');

const PORT = process.env.PORT || 5050;
const os = require('os');
const networkInterfaces = os.networkInterfaces();
const localIp = Object.values(networkInterfaces)
  .flat()
  .find((iface) => iface.family === 'IPv4' && !iface.internal).address;

// Configurar CORS
const corsOptions = {
  origin: '*',
  credentials: true,
};

app.use(cors(corsOptions));

connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://${localIp}:${PORT}`);
  });
});