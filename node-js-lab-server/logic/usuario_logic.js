const Usuario = require('../models/usuario_model');
const usuarioValidationSchema = require('../validations/usuarioValidations');

// Obtener todos los usuarios activos
const listarUsuariosActivos = async () => {
    try {
        const usuarios = await Usuario.find({ estado: true });
        return usuarios;
    } catch (error) {
        throw new Error(`Error al listar usuarios activos: ${error.message}`);
    }
};

// Obtener todos los usuarios (activos e inactivos)
const listarTodosLosUsuarios = async () => {
    try {
        const usuarios = await Usuario.find();
        return usuarios;
    } catch (error) {
        throw new Error(`Error al listar todos los usuarios: ${error.message}`);
    }
};

// Crear un nuevo usuario
const crearUsuario = async (body) => {
    const { error } = usuarioValidationSchema.validate(body);
    if (error) {
        throw new Error(error.details[0].message);
    }

    try {
        const usuario = new Usuario(body);
        const nuevoUsuario = await usuario.save();
        return nuevoUsuario;
    } catch (error) {
        throw new Error(`Error al crear el usuario: ${error.message}`);
    }
};

// Actualizar un usuario por email
const actualizarUsuario = async (email, body) => {
    const { error } = usuarioValidationSchema.validate(body);
    if (error) {
        throw new Error(error.details[0].message);
    }

    try {
        const usuario = await Usuario.findOneAndUpdate(
            { email: email },
            body,
            { new: true, runValidators: true }
        );
        if (!usuario) {
            throw new Error(`Usuario no encontrado`);
        }
        return usuario;
    } catch (error) {
        throw new Error(`Error al actualizar el usuario: ${error.message}`);
    }
};

// Desactivar un usuario por email
const desactivarUsuario = async (email) => {
    try {
        const usuario = await Usuario.findOneAndUpdate(
            { email: email },
            { estado: false },
            { new: true }
        );
        if (!usuario) {
            throw new Error(`Usuario no encontrado`);
        }
        return { message: 'Usuario desactivado' };
    } catch (error) {
        throw new Error(`Error al desactivar el usuario: ${error.message}`);
    }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (id) => {
    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            throw new Error(`Usuario no encontrado`);
        }
        return usuario;
    } catch (error) {
        throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
};

// Obtener un usuario por email
const obtenerUsuarioPorEmail = async (email) => {
    try {
        const usuario = await Usuario.findOne({ email: email });
        if (!usuario) {
            throw new Error(`Usuario no encontrado`);
        }
        return usuario;
    } catch (error) {
        throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
}
module.exports = {
    listarUsuariosActivos,
    listarTodosLosUsuarios,
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    obtenerUsuarioPorId,
    obtenerUsuarioPorEmail
   
};