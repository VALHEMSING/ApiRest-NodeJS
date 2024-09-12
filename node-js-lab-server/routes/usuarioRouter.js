const express = require('express');
const {
    listarUsuariosActivos,
    listarTodosLosUsuarios,
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    obtenerUsuarioPorId,
    obtenerUsuarioPorEmail,
    actualizarCursosDeUsuario
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
ruta.put("/usuarios/email/:email'", actualizarUsuario);

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


// Actualización de cursos de un usuario basado en su email

/**
 * @swagger
 * /usuarios/{email}/cursos:
 *   put:
 *     summary: Actualizar los cursos de un usuario
 *     description: Actualiza los cursos asignados a un usuario usando su email como identificador.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: El email del usuario que deseas actualizar
 *       - in: body
 *         name: cursosIds
 *         description: Array de IDs de los cursos que se asignarán al usuario
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             cursosIds:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "66d8d8aafbfa8375ce2cf1f1"
 *               description: IDs de los cursos a agregar
 *     responses:
 *       200:
 *         description: Cursos actualizados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cursos actualizados correctamente
 *                 usuario:
 *                   $ref: "#/definitions/Usuario"
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: VALIDATION_ERROR
 *                 message:
 *                   type: string
 *                   example: Se debe proporcionar un array de IDs de cursos.
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: NOT_FOUND
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error del servidor al actualizar los cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al actualizar los cursos del usuario
 */

ruta.put('/email/:email/cursos', actualizarCursosDeUsuario);


module.exports = ruta;