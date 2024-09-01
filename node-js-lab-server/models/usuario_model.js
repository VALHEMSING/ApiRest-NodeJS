const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Asegura que el email sea único
    },
    nombre: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    estado: {
        type: Boolean, // Cambiado a Boolean para representar estado activo/inactivo
        default: true,
    },
    imagen: {
        type: String,
        // No es necesario el campo required: false, ya que es opcional por defecto
    }
});

// Asegura que el modelo se exporte correctamente
module.exports = mongoose.model('Usuario', usuarioSchema);
