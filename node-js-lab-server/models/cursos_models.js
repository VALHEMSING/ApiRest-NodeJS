



const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    estado: {
        type: String,
        default: true
    },
    imagen: {
        type: String,
        required: false
    },
    alumnos: {
        type: Number,
        default: 0
    },
    calificacion: {
        type: Number,
        default: 0
    },
    usuarios: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario' }] // Referencia a los usuarios
});


module.exports = mongoose.model('Curso', cursoSchema);