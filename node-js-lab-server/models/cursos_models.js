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
        type: Boolean, // Cambiado a Boolean para mejor claridad
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
        ref: 'Usuario' 
    }],
    activo: { // Campo para manejar la activación/desactivación del curso
        type: Boolean,
        default: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now // Se establece por defecto la fecha actual
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now // Se actualiza la fecha cada vez que se modifica el documento
    }
});

module.exports = mongoose.model('Curso', cursoSchema);
