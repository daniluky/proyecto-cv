import React from 'react';

const SkillsForm = ({ data, updateData }) => {
    const handleSkillsChange = (e) => {
        const skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
        updateData({ habilidades: skills });
    };

    const handleLanguagesChange = (e) => {
        const languages = e.target.value.split(',').map(l => l.trim()).filter(Boolean);
        updateData({ idiomas: languages });
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <label className="text-lg font-semibold text-white mb-2 block">Habilidades</label>
                <p className="text-sm text-slate-400 mb-3">Separa tus habilidades con comas (ej: React, Node.js, Diseño UI)</p>
                <textarea
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all min-h-[120px]"
                    defaultValue={data.habilidades.join(', ')}
                    onChange={handleSkillsChange}
                    placeholder="Ej: Liderazgo, Trabajo en equipo, Python, Gestión de proyectos..."
                />
            </div>

            <div>
                <label className="text-lg font-semibold text-white mb-2 block">Idiomas</label>
                <p className="text-sm text-slate-400 mb-3">Separa los idiomas con comas (ej: Español, Inglés B2)</p>
                <textarea
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all min-h-[120px]"
                    defaultValue={data.idiomas.join(', ')}
                    onChange={handleLanguagesChange}
                    placeholder="Ej: Español (Nativo), Inglés (Avanzado), Francés (Básico)..."
                />
            </div>
        </div>
    );
};

export default SkillsForm;
