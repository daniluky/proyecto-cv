import React from 'react';
import { motion } from 'framer-motion';

const themes = [
    { id: 'green', name: 'Verde Esmeralda', color: 'bg-green-500' },
    { id: 'blue', name: 'Azul Océano', color: 'bg-blue-500' },
    { id: 'purple', name: 'Púrpura Real', color: 'bg-purple-500' },
    { id: 'red', name: 'Rojo Pasión', color: 'bg-red-500' },
    { id: 'slate', name: 'Gris Profesional', color: 'bg-slate-500' },
];

const ThemeSelectionForm = ({ currentTheme, setTheme }) => {
    return (
        <div className="animate-fadeIn text-center">
            <h2 className="text-2xl font-bold mb-6 text-white">Elige el estilo de tu CV</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {themes.map((theme) => (
                    <motion.div
                        key={theme.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setTheme({ theme: theme.id })}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all w-full max-w-[150px] flex flex-col items-center gap-3
              ${currentTheme === theme.id ? 'border-white bg-slate-700 shadow-xl' : 'border-transparent bg-slate-800 hover:bg-slate-700'}`}
                    >
                        <div className={`w-16 h-16 rounded-full ${theme.color} shadow-lg`} />
                        <span className="font-medium text-sm text-slate-300">{theme.name}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ThemeSelectionForm;
