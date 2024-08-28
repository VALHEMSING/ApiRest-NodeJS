const Curso = require('../models/cursos_models');
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
        .required()

});


//Funcin asincrona para crear cursos
async function crearCurso(body) {
    let curso = new Curso({
        titulo: body.titulo,
        descripcion: body.descripcion,
        alumnos: body.alumnos,
        calificacion: body.calificacion
    })
    return await curso.save();
}




//Funcion asincrona para actualizar cursos
async function actualizarCurso(id, body) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion
        }
    }, { new: true });
    return curso;
}



//Funcion asincrona para Desacticar cursos
async function desactivarCurso(id) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            estado: false
        }
    }, { new: true });
    return curso;
}



//Funcion asincrona para listar los cursos activos
async function listarCursosActivos() {
    let cursos = await Curso.find({ "estado": true });
    return cursos;

}

module.exports = {
    schema,
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos
}

/*
//Funcin asincrona para crear cursos
async function crearCurso(body) {
    let curso = new Curso({
        titulo: body.titulo,
        descripcion: body.descripcion,
        alumnos: body.alumnos,
        calificacion: body.calificacion
    })
    return await curso.save();
}




//Funcion asincrona para actualizar cursos
async function actualizarCurso(id, body) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion
        }
    }, { new: true });
    return curso;
}



//Funcion asincrona para Desacticar cursos
async function desactivarCurso(id) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            estado: false
        }
    }, { new: true });
    return curso;
}



//Funcion asincrona para listar los cursos activos
async function listarCursosActivos() {
    let cursos = await Curso.find({ "estado": true });
    return cursos;

}

module.exports = {
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos
}*/