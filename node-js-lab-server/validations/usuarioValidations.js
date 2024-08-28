
const Joi = require('@hapi/joi');



//Validaciones para el objeto usuario
const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[A-Za-záéíóú ]{3,30}$/),


    password: Joi.string()
        .pattern(/^[A-Za-záéíóú ]{3,30}$/),


    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'edu', 'co'] }
        })
});

module.exports = schema;