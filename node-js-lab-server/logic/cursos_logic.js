const Curso = require('../models/cursos_models');
const cursoValidationSchema = require('../validations/cursoValidations');

// Función asíncrona para crear cursos
async function crearCurso(body) {
    try {
        const { error } = cursoValidationSchema.validate(body);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const curso = new Curso({
            titulo: body.titulo,
            descripcion: body.descripcion,
            imagen: body.imagen, // Asegurarse de manejar la imagen si se proporciona
            alumnos: body.alumnos,
            calificacion: body.calificacion,
            usuarios: body.usuarios,
            activo: body.activo !== undefined ? body.activo : true, // Inicializar el curso como activo o usar el valor proporcionado
            fechaCreacion: new Date() // Establecer la fecha de creación actual
        });

        return await curso.save();
    } catch (error) {
        throw new Error(`Error al crear el curso: ${error.message}`);
    }
}

// Función asíncrona para actualizar cursos
async function actualizarCurso(id, body) {
    try {
        const { error } = cursoValidationSchema.validate(body);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const curso = await Curso.findByIdAndUpdate(id, {
            $set: {
                titulo: body.titulo,
                descripcion: body.descripcion,
                imagen: body.imagen, // Permitir actualizar la imagen
                alumnos: body.alumnos,
                calificacion: body.calificacion,
                activo: body.activo !== undefined ? body.activo : true, // Actualizar estado activo si se proporciona
                fechaActualizacion: new Date() // Establecer la fecha de actualización actual
            }
        }, { new: true, runValidators: true });

        if (!curso) {
            throw new Error(`Curso no encontrado`);
        }
        return curso;
    } catch (error) {
        throw new Error(`Error al actualizar el curso: ${error.message}`);
    }
}

// Función asíncrona para desactivar un curso por ID
async function desactivarCurso(id) {
    try {
        const curso = await Curso.findByIdAndUpdate(id, {
            $set: {
                activo: false,
                fechaActualizacion: new Date() // Actualizar la fecha de modificación al desactivar
            }
        }, { new: true });

        if (!curso) {
            throw new Error(`Curso no encontrado`);
        }
        return curso;
    } catch (error) {
        throw new Error(`Error al desactivar el curso: ${error.message}`);
    }
}

// Función asíncrona para listar los cursos activos
async function listarCursosActivos() {
    try {
        const cursos = await Curso.find({ activo: true });
        return cursos;
    } catch (error) {
        throw new Error(`Error al listar los cursos activos: ${error.message}`);
    }
}

// Función para obtener el curso por su ID
async function obtenerCursoId(id) {
    try {
        const curso = await Curso.findById(id);
        if (!curso) {
            throw new Error(`Curso no encontrado`);
        }
        return curso;
    } catch (error) {
        throw new Error(`Error al obtener el curso: ${error.message}`);
    }
}

// Función para obtener los usuarios de un curso por ID
async function obtenerUsuariosPorCurso(Id) {
    try {
        const curso = await Curso.findById(Id).populate('usuarios');
        if (!curso) {
            throw new Error(`Curso no encontrado`);
        }
        return curso.usuarios;
    } catch (error) {
        throw new Error(`Error al obtener los usuarios del curso: ${error.message}`);
    }
}

// Función asíncrona para agregar usuarios a un curso
async function agregarUsuariosACurso(Id, usuarios) {
    try {
        if (!usuarios || usuarios.length === 0) {
            throw new Error('Se deben proporcionar al menos un ID de usuario.');
        }

        const curso = await Curso.findByIdAndUpdate(
            Id,
            { $addToSet: { usuarios: { $each: usuarios } } }, // Agrega los usuarios al array, evitando duplicados
            { new: true, runValidators: true }
        );

        if (!curso) {
            throw new Error(`Curso no encontrado`);
        }

        return curso; // Retorna el curso actualizado
    } catch (error) {
        throw new Error(`Error al agregar usuarios al curso: ${error.message}`);
    }
}

module.exports = {
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos,
    obtenerCursoId,
    obtenerUsuariosPorCurso,
    agregarUsuariosACurso
};
