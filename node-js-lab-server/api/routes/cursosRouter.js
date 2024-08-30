
const express = require('express');
const {  listarCursosActivos, crearCurso, actualizarCurso, desactivarCurso } = require('../controllers/cursos');


const router = express.Router();


//Obtener los cursos
router.get('/', listarCursosActivos);

//Crear un curso
router.post('/', crearCurso);

//Actualizar el curso
router.put('/:id', actualizarCurso);

//Desactivar un curso
router.delete('/:id', desactivarCurso);

module.exports= router; 

