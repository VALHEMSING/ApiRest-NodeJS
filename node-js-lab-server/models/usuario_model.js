// models/usuario_model.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Normalizar a minúsculas
        trim: true // Eliminar espacios en blanco
    },
    nombre: {
        type: String,
        required: true,
        trim: true // Eliminar espacios en blanco
    },
    password: {
        type: String,
        required: true,
        minlength: 8 // Asegura una longitud mínima
    },
    estado: {
        type: Boolean,
        default: true
    },
    imagen: {
        type: String,
        default: 'default.jpg' // Imagen por defecto
    },
    cursos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso' // Referencia al modelo Curso
    }]
});

module.exports = mongoose.model('Usuario', usuarioSchema);
