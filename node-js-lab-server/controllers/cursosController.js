const Curso = require('../models/cursos_models');
const cursoLogic = require('../logic/cursos_logic');

// Listar todos los cursos activos
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
        const cursoActualizado = await cursoLogic.actualizarCurso(req.params.id, req.body);
        if (!cursoActualizado) {
            return res.status(404).json({ code: 'NOT_FOUND', message: 'Curso no encontrado' });
        }
        res.json(cursoActualizado);
    } catch (error) {
        res.status(400).json({ code: 'UPDATE_ERROR', message: error.message });
    }
};

// Desactivar un curso por ID
const desactivarCurso = async (req, res) => {
    try {
        const curso = await cursoLogic.desactivarCurso(req.params.id);
        if (!curso) {
            return res.status(404).json({ code: 'NOT_FOUND', message: 'Curso no encontrado' });
        }
        res.json(curso);
    } catch (error) {
        res.status(400).json({ code: 'DEACTIVATION_ERROR', message: error.message });
    }
};

// Obtener un curso por ID
const obtenerCurso = async (req, res) => {
    try {
        const curso = await cursoLogic.obtenerCursoId(req.params.id);
        if (!curso) {
            return res.status(404).json({ code: 'NOT_FOUND', message: 'Curso no encontrado' });
        }
        res.json(curso);
    } catch (error) {
        res.status(404).json({ code: 'NOT_FOUND', message: error.message });
    }
};

// Obtener usuarios de un curso por ID
const obtenerUsuariosDeCurso = async (req, res) => {
    try {
        const usuarios = await cursoLogic.obtenerUsuariosPorCurso(req.params.id);
        if (!usuarios || usuarios.length === 0) {
            return res.status(404).json({ code: 'NOT_FOUND', message: 'No se encontraron usuarios para este curso' });
        }
        res.json(usuarios);
    } catch (error) {
        res.status(404).json({ code: 'NOT_FOUND', message: error.message });
    }
};

// Agregar usuarios a un curso
const agregarUsuariosController = async (req, res) => {
    try {
        const { id } = req.params;
        const { usuariosIds } = req.body;

        if (!Array.isArray(usuariosIds) || usuariosIds.length === 0) {
            return res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Se deben proporcionar al menos un ID de usuario.' });
        }

        const cursoActualizado = await cursoLogic.agregarUsuariosACurso(id, usuariosIds);
        if (!cursoActualizado) {
            return res.status(404).json({ code: 'NOT_FOUND', message: 'Curso no encontrado' });
        }
        res.json(cursoActualizado);
    } catch (error) {
        res.status(400).json({ code: 'UPDATE_ERROR', message: error.message });
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
