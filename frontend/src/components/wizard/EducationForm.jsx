import React from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const EducationForm = ({ data, updateData, errors = {} }) => {
    const handleChange = (index, field, value) => {
        const updated = [...data];
        updated[index][field] = value;
        updateData({ educacion: updated });
    };

    const addEducation = () => {
        updateData({
            educacion: [
                ...data,
                { institucion: '', titulo: '', fechaInicio: '', fechaFin: '', descripcion: '' }
            ]
        });
    };

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        updateData({ educacion: updated });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-white mb-4">Formación Académica</h2>
            {data.map((edu, index) => (
                <div key={index} className="bg-slate-700/50 p-6 rounded-xl border border-slate-600 relative">
                    <button
                        onClick={() => removeEducation(index)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-red-400 transition-colors"
                    >
                        ✕
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Institución"
                            value={edu.institucion}
                            onChange={(e) => handleChange(index, 'institucion', e.target.value)}
                            placeholder="Universidad de..."
                            error={errors[`${index}.institucion`]}
                        />
                        <Input
                            label="Título"
                            value={edu.titulo}
                            onChange={(e) => handleChange(index, 'titulo', e.target.value)}
                            placeholder="Grado en..."
                            error={errors[`${index}.titulo`]}
                        />
                        <Input
                            label="Fecha Inicio"
                            type="date"
                            value={edu.fechaInicio}
                            onChange={(e) => handleChange(index, 'fechaInicio', e.target.value)}
                            error={errors[`${index}.fechaInicio`]}
                        />
                        <Input
                            label="Fecha Fin"
                            type="date"
                            value={edu.fechaFin}
                            onChange={(e) => handleChange(index, 'fechaFin', e.target.value)}
                            error={errors[`${index}.fechaFin`]}
                        />
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-300 mb-1 block">Descripción</label>
                            <textarea
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all min-h-[100px]"
                                value={edu.descripcion}
                                onChange={(e) => handleChange(index, 'descripcion', e.target.value)}
                                placeholder="Detalles sobre tus estudios..."
                            />
                        </div>
                    </div>
                </div>
            ))}

            <Button variant="outline" onClick={addEducation} className="w-full border-dashed">
                + Añadir Educación
            </Button>
        </div>
    );
};

export default EducationForm;
