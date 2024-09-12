const Joi = require('@hapi/joi');

// Validación para el objeto curso
const cursoSchemaValidation = Joi.object({
    titulo: Joi.string()
        .min(5)
        .max(100)
        .required()
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ0-9 .,;:'"!?()#@&$%*+-/=\[\]{}|<>^~`]+$/)
        .messages({
            'string.empty': 'El título no puede estar vacío.',
            'string.min': 'El título debe tener al menos 5 caracteres.',
            'string.max': 'El título no puede exceder los 100 caracteres.',
            'string.pattern.base': 'El título solo puede contener letras, números y símbolos permitidos.',
            'any.required': 'El título es un campo requerido'
        }),

    descripcion: Joi.string()
        .min(10)
        .max(500)
        .optional()
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ0-9 .,;:'"!?()#@&$%*+-/=\[\]{}|<>^~`]*$/)
        .messages({
            'string.min': 'La descripción debe tener al menos 10 caracteres.',
            'string.max': 'La descripción no puede exceder los 500 caracteres.',
            'string.pattern.base': 'La descripción solo puede contener letras, números y una variedad de símbolos permitidos.'
        }),

    estado: Joi.boolean()
        .default(true)
        .messages({
            'boolean.base': 'El estado debe ser un valor booleano'
        }),
    imagen: Joi.string()
        .uri()
        .optional()
        .allow('')
        .messages({
            'string.base': 'La URL debe ser una cadena de texto.',
            'string.uri': 'La URL debe tener un formato válido.',
        }),

    alumnos: Joi.number()
        .integer()
        .min(0)
        .default(0)
        .messages({
            'number.base': 'El número de alumnos debe ser un número entero.',
            'number.integer': 'El número de alumnos debe ser un entero',
            'number.min': 'El número de alumnos no puede ser negativo'
        }),

    calificacion: Joi.number()
        .precision(1)
        .min(0)
        .max(10)
        .default(0)
        .messages({
            'number.base': 'La calificación debe ser un número.',
            'number.min': 'La calificación debe ser al menos 0.',
            'number.max': 'La calificación no puede exceder 10.'
        }),
});

module.exports = cursoSchemaValidation;
