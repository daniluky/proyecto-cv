import React from 'react';
import Input from '../ui/Input';

const PersonalDataForm = ({ data, updateData, errors = {} }) => {
    const handleChange = (e) => {
        updateData({ [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 9) value = value.slice(0, 9);

        const formatted = value
            .replace(/(\d{3})(\d{3})(\d{0,3})/, (match, p1, p2, p3) => {
                return [p1, p2, p3].filter(Boolean).join(' ');
            });

        updateData({ telefono: formatted });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            <Input
                label="Nombre Completo"
                name="nombre"
                value={data.nombre}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
                error={errors.nombre}
            />
            <Input
                label="Email"
                name="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                placeholder="juan@ejemplo.com"
                error={errors.email}
            />
            <Input
                label="Fecha de Nacimiento"
                name="fechaNacimiento"
                type="date"
                value={data.fechaNacimiento}
                onChange={handleChange}
                error={errors.fechaNacimiento}
            />
            <Input
                label="Teléfono"
                name="telefono"
                value={data.telefono}
                onChange={handlePhoneChange}
                placeholder="600 123 456"
                error={errors.telefono}
            />
            <Input
                label="Ciudad"
                name="ciudad"
                value={data.ciudad}
                onChange={handleChange}
                placeholder="Madrid, España"
                className="md:col-span-2"
                error={errors.ciudad}
            />
        </div>
    );
};

export default PersonalDataForm;
