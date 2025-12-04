import React from 'react';

const themeColors = {
    green: { text: 'text-green-700', border: 'border-green-500', bg: 'bg-green-50' },
    blue: { text: 'text-blue-700', border: 'border-blue-500', bg: 'bg-blue-50' },
    purple: { text: 'text-purple-700', border: 'border-purple-500', bg: 'bg-purple-50' },
    red: { text: 'text-red-700', border: 'border-red-500', bg: 'bg-red-50' },
    slate: { text: 'text-slate-700', border: 'border-slate-500', bg: 'bg-slate-50' },
};

const CVPreview = ({ data }) => {
    const theme = themeColors[data.theme] || themeColors.green;

    return (
        <div className={`bg-white text-slate-900 p-8 rounded-lg shadow-2xl h-full min-h-[600px] text-sm overflow-y-auto sticky top-6 ${theme.bg}`}>
            <div className={`border-b-2 ${theme.border} pb-4 mb-4`}>
                <h1 className={`text-3xl font-bold uppercase tracking-wider ${theme.text}`}>{data.nombre || 'Tu Nombre'}</h1>
                <div className="text-slate-600 mt-2 flex flex-wrap gap-3 text-xs">
                    {data.email && <span>{data.email}</span>}
                    {data.telefono && <span>| {data.telefono}</span>}
                    {data.ciudad && <span>| {data.ciudad}</span>}
                </div>
            </div>

            {data.experiencia.some(e => e.empresa) && (
                <div className="mb-6">
                    <h3 className={`text-lg font-bold uppercase border-b ${theme.border} mb-3 ${theme.text}`}>Experiencia</h3>
                    <div className="space-y-4">
                        {data.experiencia.map((exp, i) => (
                            exp.empresa && (
                                <div key={i}>
                                    <div className="flex justify-between font-semibold">
                                        <span>{exp.cargo}</span>
                                        <span className="text-slate-500 text-xs">
                                            {exp.fechaInicio} - {exp.actual ? 'Presente' : exp.fechaFin}
                                        </span>
                                    </div>
                                    <div className="text-slate-700 font-medium">{exp.empresa}</div>
                                    <p className="text-slate-600 mt-1 whitespace-pre-line">{exp.descripcion}</p>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}

            {data.educacion.some(e => e.institucion) && (
                <div className="mb-6">
                    <h3 className={`text-lg font-bold uppercase border-b ${theme.border} mb-3 ${theme.text}`}>Educación</h3>
                    <div className="space-y-4">
                        {data.educacion.map((edu, i) => (
                            edu.institucion && (
                                <div key={i}>
                                    <div className="flex justify-between font-semibold">
                                        <span>{edu.titulo}</span>
                                        <span className="text-slate-500 text-xs">
                                            {edu.fechaInicio} - {edu.fechaFin}
                                        </span>
                                    </div>
                                    <div className="text-slate-700">{edu.institucion}</div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}

            {(data.habilidades.length > 0 || data.idiomas.length > 0) && (
                <div className="grid grid-cols-2 gap-4">
                    {data.habilidades.length > 0 && (
                        <div>
                            <h3 className={`text-lg font-bold uppercase border-b ${theme.border} mb-3 ${theme.text}`}>Habilidades</h3>
                            <ul className="list-disc list-inside text-slate-700">
                                {data.habilidades.map((h, i) => (
                                    <li key={i}>{h}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {data.idiomas.length > 0 && (
                        <div>
                            <h3 className={`text-lg font-bold uppercase border-b ${theme.border} mb-3 ${theme.text}`}>Idiomas</h3>
                            <ul className="list-disc list-inside text-slate-700">
                                {data.idiomas.map((l, i) => (
                                    <li key={i}>{l}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CVPreview;
