
const Curso = require('../models/cursos_models');
const cursoLogic = require('../logic/cursos_logic');

// Listar todos los cursos
const listarCursos = async (req, res) => {
    try {
        const cursos = await cursoLogic.listarCursosActivos();
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    }
};

// Crear un nuevo curso
const crearCurso = async (req, res) => {
    try {
        const nuevoCurso = await cursoLogic.crearCurso(req.body);
        res.status(201).json(nuevoCurso);
    } catch (error) {
        res.status(400).json({ code: 'CREATION_ERROR', message: error.message });
    }
};


// Actualizar un curso por ID
const actualizarCurso = async (req, res) => {
    try {
        const cursoActualizado = await cursoLogic.actualizarCurso(req.params.id, req.body); // Llama a la lógica de actualización
        res.json(cursoActualizado); // Retornar el curso actualizado
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Desactivar un curso por ID
const desactivarCurso = async (req, res) => {
    try {
        const curso = await cursoLogic.desactivarCurso(req.params.id);
        res.json(curso);
    } catch (error) {
        res.status(400).json({ code: 'DEACTIVATION_ERROR', message: error.message });
    }
};

// Obtener un curso por ID
const obtenerCurso = async (req, res) => {
    try {
        const curso = await cursoLogic.obtenerCursoId(req.params.id);
        res.json(curso);
    } catch (error) {
        res.status(404).json({ code: 'NOT_FOUND', message: error.message });
    }
};

// Obtener usuarios de un curso por ID
const obtenerUsuariosDeCurso = async (req, res) => {
    try {
        const usuarios = await cursoLogic.obtenerUsuariosPorCurso(req.params.id);
        res.json(usuarios);
    } catch (error) {
        res.status(404).json({ code: 'NOT_FOUND', message: error.message });
    }
};



const agregarUsuariosController = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID del curso de los parámetros de la ruta
        const { usuariosIds } = req.body; // Obtener los IDs de los usuarios del cuerpo de la solicitud

        const cursoActualizado = await cursoLogic.agregarUsuariosACurso(id, usuariosIds);
        res.json(cursoActualizado); // Retornar el curso actualizado
    } catch (error) {
        res.status(400).json({ message: error.message }); // Manejar errores
    }
};
module.exports = {
    listarCursos,
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    obtenerCurso,
    obtenerUsuariosDeCurso,
    agregarUsuariosController
};
