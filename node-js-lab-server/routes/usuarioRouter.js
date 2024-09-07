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


/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - email
 *         - nombre
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: ID autogenerado del usuario.
 *         email:
 *           type: string
 *           description: Email del usuario.
 *         nombre:
 *           type: string
 *           description: Nombre del usuario.
 *         password:
 *           type: string
 *           description: Contraseña del usuario.
 *         estado:
 *           type: boolean
 *           description: Estado del usuario (activo/inactivo).
 *           default: true
 *         imagen:
 *           type: string
 *           description: URL de la imagen del usuario.
 *         cursos:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs de los cursos a los que está inscrito el usuario.
 */

const ruta = express.Router();




/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios activos
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Una colección de usuarios activos.
 *         content:
 *           application/json:    
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
ruta.get("/", listarUsuariosActivos);

/**
 * @swagger
 * /api/usuarios/todos:
 *   get:
 *     summary: Obtener todos los usuarios (activos e inactivos)
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Una colección de todos los usuarios.
 *         content:
 *           application/json:    
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
ruta.get("/todos", listarTodosLosUsuarios);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
ruta.post("/", crearUsuario);

/**
 * @swagger
 * /api/usuarios/email/{email}:
 *   put:
 *     summary: Actualizar un usuario por email
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
ruta.put("/email/:email", actualizarUsuario);

/**
 * @swagger
 * /api/usuarios/email/{email}:
 *   delete:
 *     summary: Desactivar un usuario por email
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario desactivado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
ruta.delete("/email/:email", desactivarUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
ruta.get("/:id", obtenerUsuarioPorId);

/**
 * @swagger
 * /api/usuarios/email/{email}:
 *   get:
 *     summary: Obtener un usuario por email
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
ruta.get("/email/:email", obtenerUsuarioPorEmail);

module.exports = ruta;