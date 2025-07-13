const jwt = require('jsonwebtoken');

const login = (username, password) => {
  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (username === adminUser && password === adminPassword) {
    const token = jwt.sign({ username }, jwtSecret, { expiresIn: '2h' });
    return { token };
  } else {
    throw new Error('Credenciales incorrectas');
  }
};

const logout = (req, res) => {
    return res.status(200).json({ message: 'Logout exitoso' });
  }; 

module.exports = { login, logout };
