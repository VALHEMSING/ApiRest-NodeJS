const Joi = require('@hapi/joi');

// Validaciones para el objeto usuario
const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[A-Za-záéíóú ]+$/), // Permitir solo letras y espacios

    password: Joi.string()
        .min(8) // Mínimo 8 caracteres
        .max(30)
        .required() // Asegúrate de que la contraseña sea obligatoria
        .pattern(/^[A-Za-z0-9áéíóú!@#$%^&*()_+]+$/), // Permitir letras, números y algunos caracteres especiales

    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'edu', 'co'] }
        })
        .required(), // Asegúrate de que el email sea obligatorio

    estado: Joi.boolean() // Agregar el campo estado como booleano
});

module.exports = schema;