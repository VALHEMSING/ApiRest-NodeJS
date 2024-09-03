const Joi = require('@hapi/joi');


//Validacion para el objeto curso
const schema = Joi.object({
    titulo: Joi.string()
        .min(5)
        .max(100)
        .required()
        .pattern(/^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ ]+$/),

    descripcion: Joi.string()
        .min(10)
        .max(500)
        .required()
        .pattern(/^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ ,.!?]+$/),

    alumnos: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .required(),

    calificacion: Joi.number()
        .precision(1)
        .min(0)
        .max(10)
        .required(),

    usuarios: Joi.array() // Permitir un array de IDs de usuarios
        .items(Joi.string().length(24)) // Validar que cada ID sea una cadena de 24 caracteres
        .optional() // Hacer que este campo sea opcional

});




module.exports = schema;
