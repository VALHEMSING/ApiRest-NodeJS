const Joi = require('@hapi/joi');

// Validación para el objeto curso
const schema = Joi.object({
    titulo: Joi.string()
        .min(5)
        .max(100)
        .required()
        .pattern(/^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ ]+$/)
        .messages({
            'string.empty': 'El título no puede estar vacío.',
            'string.min': 'El título debe tener al menos 5 caracteres.',
            'string.max': 'El título no puede exceder los 100 caracteres.',
            'string.pattern.base': 'El título solo puede contener letras, números y espacios.'
        }),

    descripcion: Joi.string()
        .min(10)
        .max(500)
        .optional()
        .pattern(/^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ ,.!?]+$/)
        .messages({
            'string.empty': 'La descripción no puede estar vacía.',
            'string.min': 'La descripción debe tener al menos 10 caracteres.',
            'string.max': 'La descripción no puede exceder los 500 caracteres.',
            'string.pattern.base': 'La descripción solo puede contener letras, números, espacios y ciertos signos de puntuación.'
        }),

    imagen: Joi.string()
        .uri()
        .optional()
        .messages({
            'string.uri': 'La imagen debe ser una URL válida.'
        }),

    alumnos: Joi.number()
        .integer()
        .min(0) // Permitir 0 alumnos por defecto
        .max(100)
        .optional()
        .messages({
            'number.base': 'El número de alumnos debe ser un número entero.',
            'number.min': 'El número de alumnos debe ser al menos 0.',
            'number.max': 'El número de alumnos no puede exceder 100.'
        }),

    calificacion: Joi.number()
        .precision(1)
        .min(0)
        .max(10)
        .optional()
        .messages({
            'number.base': 'La calificación debe ser un número.',
            'number.min': 'La calificación debe ser al menos 0.',
            'number.max': 'La calificación no puede exceder 10.'
        }),

    usuarios: Joi.array()
        .items(Joi.string().length(24))
        .optional()
        .messages({
            'array.base': 'Los usuarios deben ser un array de IDs.',
            'string.length': 'Cada ID de usuario debe tener exactamente 24 caracteres.'
        }),

    activo: Joi.boolean()
        .required()
        .messages({
            'boolean.base': 'El campo activo debe ser verdadero o falso.'
        }),

    fechaCreacion: Joi.date()
        .required()
        .messages({
            'date.base': 'La fecha de creación debe ser una fecha válida.'
        }),

    fechaActualizacion: Joi.date()
        .optional()
        .messages({
            'date.base': 'La fecha de actualización debe ser una fecha válida.'
        })
});

module.exports = schema;
