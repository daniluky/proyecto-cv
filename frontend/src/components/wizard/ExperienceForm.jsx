import React from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const ExperienceForm = ({ data, updateData, errors = {} }) => {
    const handleChange = (index, field, value) => {
        const updated = [...data];
        updated[index][field] = value;
        updateData({ experiencia: updated });
    };

    const addExperience = () => {
        updateData({
            experiencia: [
                ...data,
                { empresa: '', cargo: '', fechaInicio: '', fechaFin: '', descripcion: '', actual: false }
            ]
        });
    };

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        updateData({ experiencia: updated });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-white mb-4">Experiencia Laboral</h2>
            {data.map((exp, index) => (
                <div key={index} className="bg-slate-700/50 p-6 rounded-xl border border-slate-600 relative">
                    <button
                        onClick={() => removeExperience(index)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-red-400 transition-colors"
                    >
                        ✕
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Empresa"
                            value={exp.empresa}
                            onChange={(e) => handleChange(index, 'empresa', e.target.value)}
                            error={errors[`${index}.empresa`]}
                        />
                        <Input
                            label="Cargo"
                            value={exp.cargo}
                            onChange={(e) => handleChange(index, 'cargo', e.target.value)}
                            error={errors[`${index}.cargo`]}
                        />
                        <Input
                            label="Fecha Inicio"
                            type="date"
                            value={exp.fechaInicio}
                            onChange={(e) => handleChange(index, 'fechaInicio', e.target.value)}
                            error={errors[`${index}.fechaInicio`]}
                        />
                        <div className="flex flex-col gap-2">
                            <Input
                                label="Fecha Fin"
                                type="date"
                                value={exp.actual ? '' : exp.fechaFin}
                                onChange={(e) => handleChange(index, 'fechaFin', e.target.value)}
                                disabled={exp.actual}
                                error={errors[`${index}.fechaFin`]}
                            />
                            <div className="flex items-center gap-2 mt-1">
                                <input
                                    type="checkbox"
                                    id={`actual-${index}`}
                                    checked={exp.actual || false}
                                    onChange={(e) => {
                                        const updated = [...data];
                                        updated[index].actual = e.target.checked;
                                        updated[index].fechaFin = e.target.checked ? '' : updated[index].fechaFin;
                                        updateData({ experiencia: updated });
                                    }}
                                    className="rounded border-slate-600 bg-slate-700 text-green-500 focus:ring-green-500"
                                />
                                <label htmlFor={`actual-${index}`} className="text-sm text-slate-300">Trabajo actual</label>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-300 mb-1 block">Descripción</label>
                            <textarea
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all min-h-[100px]"
                                value={exp.descripcion}
                                onChange={(e) => handleChange(index, 'descripcion', e.target.value)}
                                placeholder="Describe tus responsabilidades y logros..."
                            />
                        </div>
                    </div>
                </div>
            ))}

            <Button variant="outline" onClick={addExperience} className="w-full border-dashed">
                + Añadir Experiencia
            </Button>
        </div>
    );
};

export default ExperienceForm;
