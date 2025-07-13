import { useState } from 'react';
import axios from 'axios'; // Asegúrate de tener axios instalado

function CreateCV() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    fechaNacimiento: '',
    telefono: '',
    ciudad: '',
    habilidades: [''],
    idiomas: [''],
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

      const response = await axios.post('http://localhost:5050/api/cv', form);

      console.log('✅ CV creado:', response.data);
      alert('CV enviado con éxito');
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
          <input name="nombre" placeholder="Nombre" className="input" onChange={handleChange} />
          <input name="email" placeholder="Email" className="input" onChange={handleChange} />
          <input type="date" name="fechaNacimiento" className="input" onChange={handleChange} />
          <input name="telefono" placeholder="Teléfono" className="input" onChange={handleChange} />
          <input name="ciudad" placeholder="Ciudad" className="input" onChange={handleChange} />
        </div>

        {/* Habilidades */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Habilidades</h2>
          <textarea className="input w-full" placeholder="Ej: Trabajo en equipo, Liderazgo, Organización, Planificación..." onChange={(e) => setForm({ ...form, habilidades: e.target.value.split(',').map(h => h.trim()) })} />
        </div>

        {/* Idiomas */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Idiomas</h2>
          <textarea className="input w-full" placeholder="Ej: Español, Inglés, Alemán..." onChange={(e) => setForm({ ...form, idiomas: e.target.value.split(',').map(i => i.trim()) })} />
        </div>

        {/* Educación */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Educación</h2>
          {form.educacion.map((edu, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input className="input" placeholder="Institución" value={edu.institucion} onChange={(e) => handleArrayChange(e, index, 'institucion', 'educacion')} />
              <input className="input" placeholder="Título" value={edu.titulo} onChange={(e) => handleArrayChange(e, index, 'titulo', 'educacion')} />
              <input type="date" className="input" value={edu.fechaInicio} onChange={(e) => handleArrayChange(e, index, 'fechaInicio', 'educacion')} />
              <input type="date" className="input" value={edu.fechaFin} onChange={(e) => handleArrayChange(e, index, 'fechaFin', 'educacion')} />
              <textarea className="input md:col-span-2" placeholder="Descripción" value={edu.descripcion} onChange={(e) => handleArrayChange(e, index, 'descripcion', 'educacion')} />
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
              <input className="input" placeholder="Empresa" value={exp.empresa} onChange={(e) => handleArrayChange(e, index, 'empresa', 'experiencia')} />
              <input className="input" placeholder="Cargo" value={exp.cargo} onChange={(e) => handleArrayChange(e, index, 'cargo', 'experiencia')} />
              <input type="date" className="input" value={exp.fechaInicio} onChange={(e) => handleArrayChange(e, index, 'fechaInicio', 'experiencia')} />
              <input type="date" className="input" value={exp.fechaFin} onChange={(e) => handleArrayChange(e, index, 'fechaFin', 'experiencia')} />
              <textarea className="input md:col-span-2" placeholder="Descripción" value={exp.descripcion} onChange={(e) => handleArrayChange(e, index, 'descripcion', 'experiencia')} />
            </div>
          ))}
          <button className="text-sm bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg mt-2" onClick={() => addEntry('experiencia', { empresa: '', cargo: '', fechaInicio: '', fechaFin: '', descripcion: '', habilidades: [''] })}>
            + Añadir experiencia
          </button>
        </div>

        {/* Botón enviar */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-2xl font-semibold text-white shadow-xl transition"
            >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCV;

