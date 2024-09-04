const usuarioLogic = require('../logic/usuario_logic');
const usuarioValidationSchema = require('../validations/usuarioValidations');

// Obtener todos los usuarios activos
const listarUsuariosActivos = async (req, res) => {
    try {
        const usuarios = await usuarioLogic.listarUsuariosActivos();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    }
};

// Obtener todos los usuarios (activos e inactivos)
const listarTodosLosUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioLogic.listarTodosLosUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
    }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
    const { error } = usuarioValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ code: 'VALIDATION_ERROR', message: error.details[0].message });
    }

    try {
        const nuevoUsuario = await usuarioLogic.crearUsuario(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ code: 'CREATION_ERROR', message: error.message });
    }
};

// Actualizar un usuario por email
const actualizarUsuario = async (req, res) => {
    const { error } = usuarioValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ code: 'VALIDATION_ERROR', message: error.details[0].message });
    }

    try {
        const usuario = await usuarioLogic.actualizarUsuario(req.params.email, req.body);
        res.json(usuario);
    } catch (error) {
        res.status(404).json({ code: 'UPDATE_ERROR', message: error.message });
    }
};

// Desactivar un usuario por email
const desactivarUsuario = async (req, res) => {
    try {
        const resultado = await usuarioLogic.desactivarUsuario(req.params.email);
        res.json(resultado);
    } catch (error) {
        res.status(404).json({ code: 'NOT_FOUND', message: error.message });
    }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await usuarioLogic.obtenerUsuarioPorId(req.params.id);
        res.json(usuario);
    } catch (error) {
        res.status(404).json({ code: 'NOT_FOUND', message: error.message });
    }
};

// Obtener un usuario por email
const obtenerUsuarioPorEmail = async (req, res) => {
    try {
        const usuario = await usuarioLogic.obtenerUsuarioPorEmail(req.params.email);
        res.json(usuario);
    } catch (error) {
        res.status(404).json({ code: 'NOT_FOUND', message: error.message });
    }
};

module.exports = {
    listarUsuariosActivos,
    listarTodosLosUsuarios,
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    obtenerUsuarioPorId,
    obtenerUsuarioPorEmail
};
