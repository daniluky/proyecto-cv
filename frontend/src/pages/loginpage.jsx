import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await axios.post('http://localhost:5050/api/admin/login', { username, password });
      const token = response.data.token;

      // Guardar token en localStorage
      localStorage.setItem('token', token);

      // Redirigir al panel de administrador
      navigate('/admin');
    } catch (error) {
      setErrorMsg('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

        {errorMsg && <p className="text-red-500 mb-4 text-center">{errorMsg}</p>}

        <input
          type="text"
          placeholder="Usuario"
          className="w-full p-3 mb-4 rounded bg-slate-700 placeholder-gray-300"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-3 mb-6 rounded bg-slate-700 placeholder-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 p-3 rounded font-semibold"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
