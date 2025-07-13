const jwt = require('jsonwebtoken');

exports.loginPublico = (req, res) => {
  const token = jwt.sign(
    { tipo: 'anonimo', creado: Date.now() },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.status(200).json({ token });
};
