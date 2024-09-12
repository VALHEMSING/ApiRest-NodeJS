const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursos'); 

/**
 * @swagger
 * components:
 *   schemas:
 *     Curso:
 *       type: object
 *       required:
 *         - titulo
 *       properties:
 *         id:
 *           type: string
 *           description: ID autogenerado del curso.
 *         titulo:
 *           type: string
 *           description: Título del curso.
 *         descripcion:
 *           type: string
 *           description: Descripción del curso.
 *         estado:
 *           type: string
 *           description: Estado del curso (activo/inactivo).
 *           default: true
 *         imagen:
 *           type: string
 *           description: URL de la imagen del curso.
 *         alumnos:
 *           type: number
 *           description: Cantidad de alumnos inscritos en el curso.
 *           default: 0
 *         calificacion:
 *           type: number
 *           description: Calificación promedio del curso.
 *           default: 0
 */

/**
 * @swagger
 * tags:
 *   - name: Cursos
 *     description: API para gestionar cursos
 */

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     tags: 
 *       - Cursos
 *     summary: Obtener una lista de cursos activos
 *     responses:
 *       200:
 *         description: Una colección de cursos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 *             examples:
 *               ejemplo1:
 *                 value:
 *                   - id: "61f7d2bbf1a2b4b5c3cdb71d"
 *                     titulo: "Introducción a la Programación"
 *                     descripcion: "Curso básico de programación con Python"
 *                     estado: true
 *                     imagen: "https://ejemplo.com/imagen-curso.jpg"
 *                     alumnos: 150
 *                     calificacion: 4.5
 *                   - id: "61f7d2bbf1a2b4b5c3cdb71e"
 *                     titulo: "Desarrollo Web con JavaScript"
 *                     descripcion: "Curso avanzado de desarrollo web"
 *                     estado: true
 *                     imagen: "https://ejemplo.com/imagen-curso2.jpg"
 *                     alumnos: 200
 *                     calificacion: 4.8
 */
router.get('/', cursoController.listarCursosActivos);

/**
 * @swagger
 * /api/cursos:
 *   post:
 *     tags: 
 *       - Cursos
 *     summary: Crear un curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *           examples:
 *             ejemplo1:
 *               value:
 *                 titulo: "Nuevo Curso de Node.js"
 *                 descripcion: "Aprende Node.js desde cero"
 *                 estado: true
 *                 imagen: "https://ejemplo.com/imagen-curso3.jpg"
 *                 alumnos: 0
 *                 calificacion: 0
 *     responses:
 *       201:
 *         description: Curso creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *             examples:
 *               ejemplo1:
 *                 value:
 *                   id: "61f7d2bbf1a2b4b5c3cdb71f"
 *                   titulo: "Nuevo Curso de Node.js"
 *                   descripcion: "Aprende Node.js desde cero"
 *                   estado: true
 *                   imagen: "https://ejemplo.com/imagen-curso3.jpg"
 *                   alumnos: 0
 *                   calificacion: 0
 */
router.post('/', cursoController.crearCurso);

/**
 * @swagger
 * /api/cursos/{id}:
 *   put:
 *     tags: 
 *       - Cursos
 *     summary: Actualizar un curso mediante su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del curso a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *           examples:
 *             ejemplo1:
 *               value:
 *                 titulo: "Curso de Node.js Actualizado"
 *                 descripcion: "Contenido actualizado para Node.js"
 *                 estado: true
 *                 imagen: "https://ejemplo.com/imagen-curso3.jpg"
 *                 alumnos: 0
 *                 calificacion: 0
 *     responses:
 *       200:
 *         description: Curso actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *             examples:
 *               ejemplo1:
 *                 value:
 *                   id: "61f7d2bbf1a2b4b5c3cdb71f"
 *                   titulo: "Curso de Node.js Actualizado"
 *                   descripcion: "Contenido actualizado para Node.js"
 *                   estado: true
 *                   imagen: "https://ejemplo.com/imagen-curso3.jpg"
 *                   alumnos: 0
 *                   calificacion: 0
 *       404:
 *         description: Curso no encontrado.
 */
router.put('/:id', cursoController.actualizarCurso);

/**
 * @swagger
 * /api/cursos/{id}:
 *   delete:
 *     tags: 
 *       - Cursos
 *     summary: Desactivar un curso mediante su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del curso a desactivar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso desactivado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *             examples:
 *               ejemplo1:
 *                 value:
 *                   id: "61f7d2bbf1a2b4b5c3cdb71f"
 *                   titulo: "Curso de Node.js"
 *                   descripcion: "Aprende Node.js desde cero"
 *                   estado: false
 *                   imagen: "https://ejemplo.com/imagen-curso3.jpg"
 *                   alumnos: 0
 *                   calificacion: 0
 *       404:
 *         description: Curso no encontrado.
 */
router.delete('/:id', cursoController.desactivarCurso);

/**
 * @swagger
 * /api/cursos/coleccion:
 *   post:
 *     tags: 
 *       - Cursos
 *     summary: Crear una colección de cursos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Curso'
 *           examples:
 *             ejemplo1:
 *               value:
 *                 cursos:
 *                 - titulo: "Curso 1"
 *                   descripcion: "Descripción del Curso 1"
 *                   estado: true
 *                   imagen: "https://ejemplo.com/imagen-curso1.jpg"
 *                   alumnos: 100
 *                   calificacion: 4.2
 *                 - titulo: "Curso 2"
 *                   descripcion: "Descripción del Curso 2"
 *                   estado: true
 *                   imagen: "https://ejemplo.com/imagen-curso2.jpg"
 *                   alumnos: 200
 *                   calificacion: 4.7
 *                 - titulo: "Curso 3"
 *                   descripcion: "Descripción del Curso 3"
 *                   estado: true
 *                   imagen: "https://ejemplo.com/imagen-curso3.jpg"
 *                   alumnos: 300
 *                   calificacion: 4.9
 *     responses:
 *       201:
 *         description: Cursos cargados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 *             examples:
 *               ejemplo1:
 *                 value:
 *                   - id: "61f7d2bbf1a2b4b5c3cdb71d"
 *                     titulo: "Curso 1"
 *                     descripcion: "Descripción del Curso 1"
 *                     estado: true
 *                     imagen: "https://ejemplo.com/imagen-curso1.jpg"
 *                     alumnos: 100
 *                     calificacion: 4.2
 *                   - id: "61f7d2bbf1a2b4b5c3cdb71e"
 *                     titulo: "Curso 2"
 *                     descripcion: "Descripción del Curso 2"
 *                     estado: true
 *                     imagen: "https://ejemplo.com/imagen-curso2.jpg"
 *                     alumnos: 200
 *                     calificacion: 4.7
 *                   - id: "61f7d2bbf1a2b4b5c3cdb71f"
 *                     titulo: "Curso 3"
 *                     descripcion: "Descripción del Curso 3"
 *                     estado: true
 *                     imagen: "https://ejemplo.com/imagen-curso3.jpg"
 *                     alumnos: 300
 *                     calificacion: 4.9
 */
router.post('/coleccion', cursoController.guardarColeccionCursos);

/**
 * @swagger
 * /api/cursos/{id}/usuarios:
 *   get:
 *     tags: 
 *       - Cursos
 *     summary: Obtener un curso con los usuarios registrados en este
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del curso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso con sus usuarios obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *             examples:
 *               ejemplo1:
 *                 value:
 *                   id: "61f7d2bbf1a2b4b5c3cdb71f"
 *                   titulo: "Curso de Node.js"
 *                   descripcion: "Aprende Node.js desde cero"
 *                   estado: true
 *                   imagen: "https://ejemplo.com/imagen-curso3.jpg"
 *                   alumnos: 2
 *                   calificacion: 4.5
 *                   usuarios:
 *                     - id: "61f7d2bbf1a2b4b5c3cdb71d"
 *                       nombre: "Juan Pérez"
 *                       email: "juan.perez@gmail.com"
 *                       estado: true
 *                       imagen: "https://ejemplo.com/imagen-usuario1.jpg"
 *                     - id: "61f7d2bbf1a2b4b5c3cdb71e"
 *                       nombre: "Ana Gómez"
 *                       email: "ana.gomez@gmail.com"
 *                       estado: true
 *                       imagen: "https://ejemplo.com/imagen-usuario2.jpg"
 *       404:
 *         description: Curso no encontrado.
 */
router.get('/:id/usuarios', cursoController.obtenerUsuariosPorCurso);

/**
 * @swagger
 * /api/cursos/{id}:
 *   get:
 *     tags: 
 *       - Cursos
 *     summary: Obtener un curso mediante su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del curso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *             examples:
 *               ejemplo1:
 *                 value:
 *                   id: "61f7d2bbf1a2b4b5c3cdb71f"
 *                   titulo: "Curso de Node.js"
 *                   descripcion: "Aprende Node.js desde cero"
 *                   estado: true
 *                   imagen: "https://ejemplo.com/imagen-curso3.jpg"
 *                   alumnos: 0
 *                   calificacion: 0
 *       404:
 *         description: Curso no encontrado.
 */
router.get('/:id', cursoController.obtenerCursoPorId);

module.exports = router;
