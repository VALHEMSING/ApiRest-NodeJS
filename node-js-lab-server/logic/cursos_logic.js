const Curso = require('../models/cursos_models');
const cursoValidationSchema = require('../validations/cursoValidations');






//Funcin asincrona para crear cursos
async function crearCurso(body) {

    const { error } = cursoValidationSchema.validate(body);

    if (error) {
        throw new Error(error.details[0].message);
    }


    let curso = new Curso({
        titulo: body.titulo,
        descripcion: body.descripcion,
        alumnos: body.alumnos,
        calificacion: body.calificacion
    });
    return await curso.save();
}




//Funcion asincrona para actualizar cursos
async function actualizarCurso(id, body) {

    const { error } = cursoValidationSchema.validate(id, body)

    if (error) { throw new Error(error.details[0].message); }

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
}