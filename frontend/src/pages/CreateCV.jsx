import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCV() {
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    fechaNacimiento: '',
    telefono: '',
    ciudad: '',
    habilidades: [],
    idiomas: [],
    experiencia: [
      { empresa: '', cargo: '', fechaInicio: '', fechaFin: '', descripcion: '', habilidades: [''] }
    ],
    educacion: [
      { institucion: '', titulo: '', fechaInicio: '', fechaFin: '', descripcion: '' }
    ]
  });

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

    // Limpiar campos vacíos antes de enviar
    const limpiarDatos = (form) => {
      return {
        ...form,
        habilidades: form.habilidades?.filter(h => h.trim() !== '') || [],
        idiomas: form.idiomas?.filter(i => i.trim() !== '') || [],
        experiencia: form.experiencia
          .filter(exp =>
            exp.empresa?.trim() !== '' ||
            exp.cargo?.trim() !== '' ||
            exp.fechaInicio?.trim() !== '' ||
            exp.fechaFin?.trim() !== '' ||
            exp.descripcion?.trim() !== '' ||
            (exp.habilidades && exp.habilidades.some(h => h.trim() !== ''))
          ),
        educacion: form.educacion
          .filter(edu =>
            edu.institucion?.trim() !== '' ||
            edu.titulo?.trim() !== '' ||
            edu.fechaInicio?.trim() !== '' ||
            edu.fechaFin?.trim() !== '' ||
            edu.descripcion?.trim() !== ''
          )
      };
    };

    const formLimpio = limpiarDatos(form);

    try {
      const response = await axios.post(`${baseURL}/cv`, formLimpio);
      const newCV = response.data.cv;

      console.log('✅ CV creado:', response.data);
      alert('CV enviado con éxito');

      navigate(`/vista-previa/${newCV._id}`);
    } catch (error) {
      console.error('❌ Error al enviar CV:', error);
      alert('Error al enviar el CV');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-slate-800 p-6 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-400">Crear Curriculum</h1>

        {/* Datos personales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Nombre</label>
            <input name="nombre" placeholder="Manuel Gomez Diaz" className="input" onChange={handleChange} />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input name="email" placeholder="Manuel@gmail.com" className="input" onChange={handleChange} />
          </div>
          <div>
            <label className="text-sm">Fecha de nacimiento</label>
            <input type="date" name="fechaNacimiento" className="input" onChange={handleChange} />
          </div>
          <div>
            <label className="text-sm">Teléfono</label>
            <input name="telefono" placeholder="678123456" className="input" value={form.telefono} onChange={handlePhoneChange} />
          </div>
          <div>
            <label className="text-sm">Ciudad</label>
            <input name="ciudad" placeholder="Sevilla" className="input" onChange={handleChange} />
          </div>
        </div>

        {/* Habilidades */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Habilidades</h2>
          <textarea className="input w-full" placeholder="Ej: Trabajo en equipo, Liderazgo, Organización, Planificación..." onChange={(e) => setForm({ ...form, habilidades: e.target.value.split(',').map(h => h.trim()).filter(Boolean) })} />
        </div>

        {/* Idiomas */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Idiomas</h2>
          <textarea className="input w-full" placeholder="Ej: Español, Inglés, Alemán..." onChange={(e) => setForm({ ...form, idiomas: e.target.value.split(',').map(i => i.trim()).filter(Boolean) })} />
        </div>

        {/* Educación */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Educación</h2>
          {form.educacion.map((edu, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm">Institución</label>
                <input className="input" placeholder="Universidad de Sevilla" value={edu.institucion} onChange={(e) => handleArrayChange(e, index, 'institucion', 'educacion')} />
              </div>
              <div>
                <label className="text-sm">Título</label>
                <input className="input" placeholder="Ingerniería Mecánica" value={edu.titulo} onChange={(e) => handleArrayChange(e, index, 'titulo', 'educacion')} />
              </div>
              <div>
                <label className="text-sm">Fecha de inicio</label>
                <input type="date" className="input" value={edu.fechaInicio} onChange={(e) => handleArrayChange(e, index, 'fechaInicio', 'educacion')} />
              </div>
              <div>
                <label className="text-sm">Fecha de fin</label>
                <input type="date" className="input" value={edu.fechaFin} onChange={(e) => handleArrayChange(e, index, 'fechaFin', 'educacion')} />
              </div>
              <div>
                <label className="text-sm">Descripción</label>
                <textarea className="input md:col-span-2" placeholder="Ej: Grado en Ingeniería Mecánica, conocimientos en programación..." value={edu.descripcion} onChange={(e) => handleArrayChange(e, index, 'descripcion', 'educacion')} />
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
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm">Empresa</label>
                <input className="input" placeholder="Construcciones y Servicios" value={exp.empresa} onChange={(e) => handleArrayChange(e, index, 'empresa', 'experiencia')} />
              </div>
              <div>
                <label className="text-sm">Cargo</label>
                <input className="input" placeholder="Encargado de mantenimiento" value={exp.cargo} onChange={(e) => handleArrayChange(e, index, 'cargo', 'experiencia')} />
              </div>
              <div>
                <label className="text-sm">Fecha de inicio</label>
                <input type="date" className="input" value={exp.fechaInicio} onChange={(e) => handleArrayChange(e, index, 'fechaInicio', 'experiencia')} />
              </div>
              <div>
                <label className="text-sm">Fecha de fin</label>
                <input
                  type="date"
                  className="input"
                  value={exp.actual ? '' : exp.fechaFin}
                  onChange={(e) => handleArrayChange(e, index, 'fechaFin', 'experiencia')}
                  disabled={exp.actual}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={exp.actual || false}
                    onChange={(e) => {
                      const updated = [...form.experiencia];
                      updated[index].actual = e.target.checked;
                      updated[index].fechaFin = e.target.checked ? '9999-12-31' : ''; // Establecer fecha especial o limpiar
                      setForm({ ...form, experiencia: updated });
                    }}
                  />
                  <label className="text-sm">Trabajo actual</label>
                </div>
              </div>
              <div>
                <label className="text-sm">Descripción</label>
                <textarea className="input md:col-span-2" placeholder="Arreglo y mantenimiento de equipos de construcción" value={exp.descripcion} onChange={(e) => handleArrayChange(e, index, 'descripcion', 'experiencia')} />
              </div>
            </div>
          ))}
          <button className="text-sm bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg mt-2" onClick={() => addEntry('experiencia', { empresa: '', cargo: '', fechaInicio: '', fechaFin: '', descripcion: '', habilidades: [''] })}>
            + Añadir experiencia
          </button>
        </div>

        {/* Botón enviar */}
        <div className="mt-8 flex justify-center gap-4" >
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-2xl font-semibold text-white shadow-xl transition"
          >
            Enviar
          </button>

          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 hover:bg-gray-600 px-8 py-3 rounded-2xl font-semibold text-white shadow-xl transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCV;

