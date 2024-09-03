// models/usuario_model.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
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
        type: Boolean,
        default: true,
    },
    cursos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso', // Referencia al modelo Curso
    }]
});

module.exports = mongoose.model('Usuario', usuarioSchema);