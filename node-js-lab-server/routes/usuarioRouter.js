const express = require('express');
const {listarUsuariosActivos, crearUsuario, actualizarUsuario, desactivarUsuario } = require('../controllers/usuariosController');

const ruta = express.Router();

ruta.get("/", listarUsuariosActivos)

ruta.post("/", crearUsuario)

ruta.put("/:email",actualizarUsuario )
ruta.delete("/:email", desactivarUsuario)


module.exports = ruta;