const Joi = require('@hapi/joi');

// Validaciones para el objeto usuario
const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[A-Za-záéíóú ]+$/) // Permitir solo letras y espacios
        .messages({
            'string.empty': 'El nombre no puede estar vacío.',
            'string.min': 'El nombre debe tener al menos 3 caracteres.',
            'string.max': 'El nombre no puede exceder los 30 caracteres.',
            'string.pattern.base': 'El nombre solo puede contener letras y espacios.'
        }),

    password: Joi.string()
        .min(8) // Mínimo 8 caracteres
        .max(30)
        .required()
        .pattern(/^[A-Za-z0-9áéíóú!@#$%^&*()_+]+$/) // Permitir letras, números y algunos caracteres especiales
        .messages({
            'string.empty': 'La contraseña no puede estar vacía.',
            'string.min': 'La contraseña debe tener al menos 8 caracteres.',
            'string.max': 'La contraseña no puede exceder los 30 caracteres.',
            'string.pattern.base': 'La contraseña solo puede contener letras, números y ciertos caracteres especiales.'
        }),

    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'edu', 'co'] }
        })
        .required() // Asegúrate de que el email sea obligatorio
        .messages({
            'string.email': 'El email debe ser una dirección de correo electrónico válida.',
            'string.empty': 'El email no puede estar vacío.'
        }),

    estado: Joi.boolean()
        .optional() // Hacer el campo opcional
        .messages({
            'boolean.base': 'El estado debe ser verdadero o falso.'
        }),

    imagen: Joi.string()
        .uri() // Validar que sea una URI válida
        .allow(null) // Permitir que el campo imagen sea nulo si no se proporciona
        .default('default.jpg') // Valor por defecto si no se proporciona imagen
        .messages({
            'string.uri': 'La imagen debe ser una URI válida.'
        })
});

module.exports = schema;
