const express = require('express');
const {
    listarUsuariosActivos,
    listarTodosLosUsuarios,
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    obtenerUsuarioPorId,
    obtenerUsuarioPorEmail
} = require('../controllers/usuariosController');

const ruta = express.Router();

// Obtener todos los usuarios activos
ruta.get("/", listarUsuariosActivos);

// Obtener todos los usuarios (activos e inactivos)
ruta.get("/todos", listarTodosLosUsuarios);

// Crear un nuevo usuario
ruta.post("/", crearUsuario);

// Actualizar un usuario por email
ruta.put("/email/:email", actualizarUsuario);

// Desactivar un usuario por email
ruta.delete("/email/:email", desactivarUsuario);

// Obtener un usuario por ID
ruta.get("/:id", obtenerUsuarioPorId);

// Obtener un usuario por email
ruta.get("/email/:email", obtenerUsuarioPorEmail);

module.exports = ruta;