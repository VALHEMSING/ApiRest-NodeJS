
const express = require('express');
const { listarUsuariosActivos, crearUsuario, actualizarUsuario, desactivarUsuario } = require('../controllers/usuariosController');


const router = express.Router();

// Obtener todos los usuarios
router.get('/', listarUsuariosActivos);

// Crear un nuevo usuario
router.post('/', crearUsuario);

// Actualizar un usuario por ID
router.put('/:email', actualizarUsuario);

// Eliminar un usuario por ID
router.delete('/:email', desactivarUsuario);

module.exports = router;