const Usuario = require('../models/usuario_model');
const usuarioValidationSchema = require('../validations/usuarioValidations');

// Obtener todos los usuarios activos
const listarUsuariosActivos = async (req, res) => {
    try {
        const usuarios = await Usuario.find({ estado: true });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
    const { error } = usuarioValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const usuario = new Usuario(req.body);
        const nuevoUsuario = await usuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un usuario por email
const actualizarUsuario = async (req, res) => {
    const { error } = usuarioValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const usuario = await Usuario.findOneAndUpdate(
            { email: req.params.email },
            req.body,
            { new: true, runValidators: true }
        );
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Desactivar un usuario por email
const desactivarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findOneAndUpdate(
            { email: req.params.email },
            { estado: false },
            { new: true }
        );
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario desactivado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    listarUsuariosActivos,
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario
};
