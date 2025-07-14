import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditCV() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const baseURL = import.meta.env.VITE_API_URL;


  const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.username === 'admin' ? 'admin' : 'user'; // O payload.role si usas roles
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return null;
    }
  };

  const role = getUserRole();


  useEffect(() => {
    const fetchCV = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${baseURL}/cv/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Convertir fechas a formato YYYY-MM-DD si existen
        const parsedData = {
          ...res.data,
          fechaNacimiento: res.data.fechaNacimiento?.slice(0, 10) || '',
          experiencia: res.data.experiencia.map(e => ({
            ...e,
            fechaInicio: e.fechaInicio?.slice(0, 10) || '',
            fechaFin: e.fechaFin?.slice(0, 10) || ''
          })),
          educacion: res.data.educacion.map(e => ({
            ...e,
            fechaInicio: e.fechaInicio?.slice(0, 10) || '',
            fechaFin: e.fechaFin?.slice(0, 10) || ''
          }))
        };

        setForm(parsedData);
      } catch (error) {
        console.error('❌ Error al cargar el CV:', error);
        alert('No se pudo cargar el CV');
        navigate('/admin');
      }
    };

    fetchCV();
  }, [id, navigate, baseURL]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 9) value = value.slice(0, 9);

    const formatted = value
      .replace(/(\d{3})(\d{3})(\d{0,3})/, (match, p1, p2, p3) => {
        return [p1, p2, p3].filter(Boolean).join(' ');
      });

    setForm((prev) => ({ ...prev, telefono: formatted }));
  };

  const handleArrayChange = (e, index, field, section) => {
    const updated = [...form[section]];
    updated[index][field] = e.target.value;
    setForm({ ...form, [section]: updated });
  };

  const addEntry = (section, emptyObject) => {
    setForm({ ...form, [section]: [...form[section], emptyObject] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${baseURL}/cv/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('✅ CV actualizado con éxito');
      navigate('/admin');
    } catch (error) {
      console.error('❌ Error al actualizar el CV:', error);
      alert('Error al actualizar el CV');
    }
  };

  const handleCancel = () => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  if (!form) return <p className="text-white p-6">Cargando CV...</p>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-slate-800 p-6 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">Editar Curriculum</h1>

        {/* Datos personales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Nombre</label>
            <input name="nombre" placeholder="Manuel Gomez Diaz" className="input placeholder-gray-400" value={form.nombre || ''} onChange={handleChange} />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input name="email" placeholder="Manuel@gmail.com" className="input placeholder-gray-400" value={form.email || ''} onChange={handleChange} />
          </div>
          <div>
            <label className="text-sm">Fecha de nacimiento</label>
            <input type="date" name="fechaNacimiento" className="input placeholder-gray-400" value={form.fechaNacimiento || ''} onChange={handleChange} />
          </div>
          <div>
            <label className="text-sm">Teléfono</label>
            <input name="telefono" placeholder="678123456" className="input placeholder-gray-400" value={form.telefono} onChange={handlePhoneChange} />
          </div>
          <div>
            <label className="text-sm">Ciudad</label>
            <input name="ciudad" placeholder="Sevilla" className="input placeholder-gray-400" value={form.ciudad || ''} onChange={handleChange} />
          </div>
        </div>

        {/* Habilidades */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Habilidades</h2>
          <textarea
            className="input placeholder-gray-400w-full"
            placeholder="Ej: Trabajo en equipo, Liderazgo, Organización, Planificación..."
            value={form.habilidades.join(', ')}
            onChange={(e) => setForm({ ...form, habilidades: e.target.value.split(',').map(h => h.trim()) })}
          />
        </div>

        {/* Idiomas */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Idiomas</h2>
          <textarea
            className="input placeholder-gray-400 w-full"
            placeholder="Ej: Español, Inglés, Alemán..."
            value={form.idiomas.join(', ')}
            onChange={(e) => setForm({ ...form, idiomas: e.target.value.split(',').map(i => i.trim()) })}
          />
        </div>

        {/* Educación */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Educación</h2>
          {form.educacion.map((edu, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div>
                <label className="text-sm">Institución</label>
                <input className="input placeholder-gray-400" placeholder="Universidad de Sevilla" value={edu.institucion} onChange={(e) => handleArrayChange(e, index, 'institucion', 'educacion')} />
              </div>
              <div>
                <label className="text-sm">Título</label>
                <input className="input placeholder-gray-400" placeholder="Ingerniería Mecánica" value={edu.titulo} onChange={(e) => handleArrayChange(e, index, 'titulo', 'educacion')} />
              </div>
              <div>
                <label className="text-sm">Fecha de inicio</label>
                <input type="date" className="input placeholder-gray-400" value={edu.fechaInicio} onChange={(e) => handleArrayChange(e, index, 'fechaInicio', 'educacion')} />
              </div>
              <div>
                <label className="text-sm">Fecha de fin</label>
                <input type="date" className="input placeholder-gray-400" value={edu.fechaFin} onChange={(e) => handleArrayChange(e, index, 'fechaFin', 'educacion')} />
              </div>
              <div>
                <label className="text-sm">Descripción</label>
                <textarea className="input placeholder-gray-400" placeholder="Ej: Grado en Ingeniería Mecánica, conocimientos en programación..." value={edu.descripcion} onChange={(e) => handleArrayChange(e, index, 'descripcion', 'educacion')} />
              </div>
            </div>
          ))}
          <button className="text-sm bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg mt-2" onClick={() => addEntry('educacion', { institucion: '', titulo: '', fechaInicio: '', fechaFin: '', descripcion: '' })}>
            + Añadir educación
          </button>
        </div>

        {/* Experiencia */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Experiencia laboral</h2>
          {form.experiencia.map((exp, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div>
                <label className="text-sm">Empresa</label>
                <input className="input placeholder-gray-400" placeholder="Construcciones y Servicios" value={exp.empresa} onChange={(e) => handleArrayChange(e, index, 'empresa', 'experiencia')} />
              </div>
              <div>
                <label className="text-sm">Cargo</label>
                <input className="input placeholder-gray-400" placeholder="Encargado de mantenimiento" value={exp.cargo} onChange={(e) => handleArrayChange(e, index, 'cargo', 'experiencia')} />
              </div>
              <div>
                <label className="text-sm">Fecha de inicio</label>
                <input type="date" className="input placeholder-gray-400" value={exp.fechaInicio} onChange={(e) => handleArrayChange(e, index, 'fechaInicio', 'experiencia')} />
              </div>
              <div>
                <label className="text-sm">Fecha de fin</label>
                <input type="date" className="input placeholder-gray-400" value={exp.fechaFin} onChange={(e) => handleArrayChange(e, index, 'fechaFin', 'experiencia')} />
              </div>
              <div>
                <label className="text-sm">Descripción</label>
                <textarea className="input placeholder-gray-400md:col-span-2" placeholder="Arreglo y mantenimiento de equipos de construcción" value={exp.descripcion} onChange={(e) => handleArrayChange(e, index, 'descripcion', 'experiencia')} />
              </div>
            </div>
          ))}
          <button className="text-sm bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg mt-2" onClick={() => addEntry('experiencia', { empresa: '', cargo: '', fechaInicio: '', fechaFin: '', descripcion: '', habilidades: [''] })}>
            + Añadir experiencia
          </button>
        </div>

        {/* Botones */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 hover:bg-yellow-600 px-8 py-3 rounded-2xl font-semibold text-white shadow-xl transition"
          >
            Guardar cambios
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-600 hover:bg-gray-700 px-8 py-3 rounded-2xl font-semibold text-white shadow-xl transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCV;
