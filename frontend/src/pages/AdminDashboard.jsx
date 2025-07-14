import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function AdminDashboard() {
  const baseURL = import.meta.env.VITE_API_URL;
  const [cvs, setCvs] = useState([]);
  const navigate = useNavigate();
  const fetchCVs = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${baseURL}/admin/cvs`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Ordenar alfabéticamente por nombre (insensible a mayúsculas/minúsculas)
      const sorted = res.data.sort((a, b) =>
        a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
      );

      setCvs(sorted);
    } catch (err) {
      console.error('Error al obtener los CVs:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  }, [baseURL, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar este CV?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseURL}/admin/cv/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCvs(cvs.filter((cv) => cv._id !== id));
    } catch (err) {
      console.error('Error al eliminar CV:', err);
    }
  };

  const handleDownload = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseURL}/admin/cv/${id}/pdf`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Crear URL de descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `CV_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('❌ Error al descargar el CV:', error);
      alert('No se pudo descargar el CV');
    }
  };

  const handleEdit = (id) => {
    navigate(`/editar-cv/${id}`);
  };

  useEffect(() => {
    fetchCVs();
  }, [fetchCVs]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel de Administrador</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-800 rounded-xl shadow-lg">
          <thead>
            <tr className="text-left border-b border-slate-700">
              <th className="p-3">Nombre</th>
              <th className="p-3">Email</th>
              <th className="p-3">Teléfono</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cvs.map((cv) => (
              <tr key={cv._id} className="border-b border-slate-700">
                <td className="p-3">{cv.nombre}</td>
                <td className="p-3">{cv.email}</td>
                <td className="p-3">{cv.telefono}</td>
                <td className="p-3 flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleEdit(cv._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => handleDownload(cv._id)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                  >
                    Descargar
                  </button>
                  <button
                    onClick={() => handleDelete(cv._id)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {cvs.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-400">
                  No hay CVs registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
