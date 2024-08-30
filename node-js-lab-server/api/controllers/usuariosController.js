const express = require('express');
const router = express.Router();
const logic = require('../logic/usuario_logic');

// Endpoint de tipo POST para crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        const resultado = await logic.crearUsuario(req.body);
        res.status(201).json({ usuario: resultado });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Endpoint de tipo PUT para actualizar los datos del usuario por email
router.put('/:email', async (req, res) => {
    try {
        const resultado = await logic.actualizarUsuario(req.params.email, req.body);
        if (!resultado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(resultado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Endpoint de tipo DELETE para desactivar un usuario por email
router.delete('/:email', async (req, res) => {
    try {
        const resultado = await logic.desactivarUsuario(req.params.email);
        if (!resultado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Éxito al desactivar al usuario', usuario: resultado });
    } catch (err) {
        res.status(400).json({ message: 'Error al desactivar al usuario', error: err.message });
    }
});

// Endpoint de tipo GET para listar todos los usuarios activos
router.get('/', async (req, res) => {
    try {
        const usuarios = await logic.listarUsuariosActivos();
        res.json(usuarios);
    } catch (err) {
        res.status(400).json({ message: 'Error al listar los usuarios activos', error: err.message });
    }
});

module.exports = router;