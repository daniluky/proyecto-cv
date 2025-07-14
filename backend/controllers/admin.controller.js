const adminService = require('../services/admin.services');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (username === adminUser && password === adminPassword) {
    const token = jwt.sign({ username, role: 'admin' }, jwtSecret, { expiresIn: '2h' });
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }
};

exports.logout = (req, res) => {
  // Si usas JWT, el logout es responsabilidad del cliente (borrar el token)
  // Aquí simplemente respondemos éxito
  return res.status(200).json({ message: 'Logout exitoso' });
};
