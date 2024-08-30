const express = require('express');
const { listarUsuariosActivos, crearUsuario, actualizarUsuario, desactivarUsuario } = require('../controllers/usuariosController');

const router = express.Router();


// Crear un nuevo usuario
router.post('/', crearUsuario); // Asegúrate de que crearUsuario esté definido

// Obtener todos los usuarios
router.get('/', listarUsuariosActivos); // Asegúrate de que listarUsuariosActivos esté definido


// Actualizar un usuario por email
router.put('/:email', actualizarUsuario); // Asegúrate de que actualizarUsuario esté definido

// Eliminar un usuario por email
router.delete('/:email', desactivarUsuario); // Asegúrate de que desactivarUsuario esté definido

module.exports = router;