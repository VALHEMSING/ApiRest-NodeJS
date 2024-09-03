
const express = require('express');
const {listarCursos,
    crearCurso,actualizarCurso,
    desactivarCurso, 
    obtenerCurso, 
    obtenerUsuariosDeCurso,
    agregarUsuariosController
} = require('../controllers/cursosController');
//{listarCursos,crearCurso,actualizarCurso,desactivarCurso, obtenerCurso, obtenerUsuariosDeCurso}
const ruta = express.Router();

// Obtener todos los cursos activos
ruta.get('/', listarCursos);

// Crear un nuevo curso
ruta.post('/', crearCurso);

// Actualizar un curso por ID
ruta.put('/:id', actualizarCurso);

// Desactivar un curso por ID
ruta.delete('/:id', desactivarCurso);

// Obtener un curso por ID
ruta.get('/:id', obtenerCurso);

// Obtener usuarios de un curso
ruta.get('/:id/usuarios', obtenerUsuariosDeCurso);

// Endpoint para agregar usuarios a un curso
ruta.put('/:id/usuarios', agregarUsuariosController);

module.exports = ruta;


