import { z } from 'zod';

export const personalDataSchema = z.object({
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    fechaNacimiento: z.string().refine(val => val !== '', 'La fecha de nacimiento es obligatoria'),
    telefono: z.string().min(9, 'El teléfono debe tener al menos 9 dígitos'),
    ciudad: z.string().min(2, 'La ciudad es obligatoria'),
    theme: z.string().optional()
});

export const experienceItemSchema = z.object({
    empresa: z.string().min(1, 'La empresa es obligatoria'),
    cargo: z.string().min(1, 'El cargo es obligatorio'),
    fechaInicio: z.string().min(1, 'La fecha de inicio es obligatoria'),
    fechaFin: z.string().optional(),
    actual: z.boolean().optional(),
    descripcion: z.string().optional()
});

export const experienceSchema = z.array(experienceItemSchema).optional();

export const educationItemSchema = z.object({
    institucion: z.string().min(1, 'La institución es obligatoria'),
    titulo: z.string().min(1, 'El título es obligatorio'),
    fechaInicio: z.string().min(1, 'La fecha de inicio es obligatoria'),
    fechaFin: z.string().min(1, 'La fecha de fin es obligatoria'),
    descripcion: z.string().optional()
});

export const educationSchema = z.array(educationItemSchema).optional();
