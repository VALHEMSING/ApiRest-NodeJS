
const express = require('express');
const {listarCursos, crearCurso, actualizarCurso, eliminarCurso } = require('../controllers/cursosController');


const ruta = express.Router();


//Obtener los cursos
ruta.get('/', listarCursos);

//Crear un curso
ruta.post('/', crearCurso);

//Actualizar el curso
ruta.put('/:id', actualizarCurso);

//Desactivar un curso
ruta.delete('/:id', eliminarCurso);

module.exports= ruta; 

