import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VistaPreviaCV() {
  const { id } = useParams();
  const [cv, setCv] = useState(null);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const res = await axios.get(`${baseURL}/cv/${id}`);
        setCv(res.data);
      } catch (error) {
        console.error('Error al cargar CV:', error);
      }
    };

    fetchCV();
  }, [id, baseURL]);

  const handleDownload = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseURL}/cv/${id}/pdf`, {
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

  if (!cv) return <div className="text-white p-8">Cargando CV...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-slate-800 p-6 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-green-400 text-center">
          Vista previa del CV
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div><strong>Nombre:</strong> {cv.nombre}</div>
          <div><strong>Email:</strong> {cv.email}</div>
          <div><strong>Teléfono:</strong> {cv.telefono}</div>
          <div><strong>Ciudad:</strong> {cv.ciudad}</div>
          <div><strong>Fecha de nacimiento:</strong> {cv.fechaNacimiento?.substring(0, 10)}</div>
        </div>

        <div className="mb-4">
          <strong>Habilidades:</strong> {cv.habilidades.join(', ')}
        </div>

        <div className="mb-4">
          <strong>Idiomas:</strong> {cv.idiomas.join(', ')}
        </div>

        <div className="mb-4">
          <strong>Educación:</strong>
          {cv.educacion.map((edu, i) => (
            <div key={i} className="ml-4 mb-2">
              <p><strong>Institución:</strong> {edu.institucion}</p>
              <p><strong>Título:</strong> {edu.titulo}</p>
              <p><strong>Fechas:</strong> {edu.fechaInicio?.substring(0, 10)} - {edu.fechaFin?.substring(0, 10)}</p>
              <p><strong>Descripción:</strong> {edu.descripcion}</p>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <strong>Experiencia:</strong>
          {cv.experiencia.map((exp, i) => (
            <div key={i} className="ml-4 mb-2">
              <p><strong>Empresa:</strong> {exp.empresa}</p>
              <p><strong>Cargo:</strong> {exp.cargo}</p>
              <p><strong>Fechas:</strong> {exp.fechaInicio?.substring(0, 10)} - {exp.fechaFin?.substring(0, 10)}</p>
              <p><strong>Descripción:</strong> {exp.descripcion}</p>
              {exp.habilidades?.length > 0 && (
                <p><strong>Habilidades:</strong> {exp.habilidades.join(', ')}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded-lg"
          >
            Volver al inicio
          </button>
          <button
            onClick={() => navigate(`/editar-cv/${id}`)}
            className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-lg"
          >
            Modificar CV
          </button>
          <button
            onClick={() => handleDownload(cv._id)}
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
          >
            Descargar
          </button>
        </div>
      </div>
    </div>
  );
}

export default VistaPreviaCV;
