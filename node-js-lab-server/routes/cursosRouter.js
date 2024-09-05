const express = require('express');
const {
    listarCursos,
    crearCurso,actualizarCurso,
    desactivarCurso, 
    obtenerCurso, 
    obtenerUsuariosDeCurso,
    agregarUsuariosController
} = require('../controllers/cursosController');


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

const ruta = express.Router();
/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Obtener lista de cursos activos
 *     tags:
 *       - Cursos
 *     responses:
 *       200:
 *         description: Una colección de cursos.
 *         content:
 *           application/json:    
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   titulo:
 *                     type: string
 *                     minLength: 5
 *                     maxLength: 100
 *                     description: El título del curso (debe contener solo letras, números y espacios).
 *                   descripcion:
 *                     type: string
 *                     minLength: 10
 *                     maxLength: 500
 *                     description: Una breve descripción del curso (debe permitir ciertos signos de puntuación).
 *                   alumnos:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 100
 *                     description: El número de alumnos inscritos en el curso.
 *                   calificacion:
 *                     type: number
 *                     format: float
 *                     minimum: 0
 *                     maximum: 10
 *                     description: La calificación promedio del curso.
 *                   usuarios:
 *                     type: array
 *                     items:
 *                       type: string
 *                       minLength: 24
 *                       maxLength: 24
 *                       description: ID de usuario asociado al curso (debe tener 24 caracteres).
 *                   activo:
 *                     type: boolean
 *                     description: Indica si el curso está activo o no.
 *                   fechaCreacion:
 *                     type: string
 *                     format: date
 *                     description: La fecha de creación del curso.
 *                   fechaActualizacion:
 *                     type: string
 *                     format: date
 *                     description: La fecha de la última actualización del curso.
 *                 required:
 *                   - titulo
 *                   - descripcion
 *                   - alumnos
 *                   - calificacion
 *                   - activo
 *                   - fechaCreacion
 *             example:
 *               - titulo: "Introducción a la Programación"
 *                 descripcion: "Curso básico de programación utilizando Python."
 *                 alumnos: 30
 *                 calificacion: 8.5
 *                 usuarios: 
 *                   - "60d5ec49b3f1c2b5c8b6a5f0"
 *                   - "60d5ec49b3f1c2b5c8b6a5f1"
 *                 activo: true
 *                 fechaCreacion: "2024-09-01"
 *                 fechaActualizacion: "2024-09-02"
 *               - titulo: "Desarrollo Web"
 *                 descripcion: "Aprende a crear sitios web modernos utilizando HTML, CSS y JavaScript."
 *                 alumnos: 25
 *                 calificacion: 9.0
 *                 usuarios: 
 *                   - "60d5ec49b3f1c2b5c8b6a5f2"
 *                 activo: true
 *                 fechaCreacion: "2024-09-05"
 *                 fechaActualizacion: "2024-09-06"
 */
ruta.get('/', listarCursos);
/**
 * @swagger
 * /api/cursos:
 *   post:
 *     summary: Crear un nuevo curso
 *     tags:
 *       - Cursos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 100
 *                 description: El título del curso (debe contener solo letras, números y espacios).
 *               descripcion:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 500
 *                 description: Una breve descripción del curso (debe permitir ciertos signos de puntuación).
 *               alumnos:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 100
 *                 description: El número de alumnos inscritos en el curso.
 *               calificacion:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 maximum: 10
 *                 description: La calificación promedio del curso.
 *               usuarios:
 *                 type: array
 *                 items:
 *                   type: string
 *                   minLength: 24
 *                   maxLength: 24
 *                   description: ID de usuario asociado al curso (debe tener 24 caracteres).
 *               activo:
 *                 type: boolean
 *                 description: Indica si el curso está activo o no.
 *               fechaCreacion:
 *                 type: string
 *                 format: date
 *                 description: La fecha de creación del curso (se puede establecer automáticamente).
 *               fechaActualizacion:
 *                 type: string
 *                 format: date
 *                 description: La fecha de la última actualización del curso (se puede establecer automáticamente).
 *             required:
 *               - titulo
 *               - descripcion
 *               - alumnos
 *               - calificacion
 *               - activo
 *               - fechaCreacion
 *     responses:
 *       201:
 *         description: Curso creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: El ID único del curso creado.
 *                 titulo:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 alumnos:
 *                   type: integer
 *                 calificacion:
 *                   type: number
 *                   format: float
 *                 usuarios:
 *                   type: array
 *                   items:
 *                     type: string
 *                     minLength: 24
 *                     maxLength: 24
 *                 activo:
 *                   type: boolean
 *                 fechaCreacion:
 *                   type: string
 *                   format: date
 *                 fechaActualizacion:
 *                   type: string
 *                   format: date
 *               required:
 *                 - id
 *                 - titulo
 *                 - descripcion
 *                 - alumnos
 *                 - calificacion
 *                 - activo
 *                 - fechaCreacion
 *             example:
 *               id: "60d5ec49b3f1c2b5c8b6a5f0"
 *               titulo: "Introducción a la Programación"
 *               descripcion: "Curso básico de programación utilizando Python."
 *               alumnos: 30
 *               calificacion: 8.5
 *               usuarios: 
 *                 - "60d5ec49b3f1c2b5c8b6a5f0"
 *               activo: true
 *               fechaCreacion: "2024-09-01"
 *               fechaActualizacion: "2024-09-01"
 */
ruta.post('/', crearCurso);
/**
 * @swagger
 * /api/cursos/{id}:
 *   put:
 *     summary: Actualizar un curso por ID
 *     tags:
 *       - Cursos
 *     parameters:
 *       - in: path
 *         name: id
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
 *               titulo:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 100
 *                 description: El título del curso (debe contener solo letras, números y espacios).
 *               descripcion:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 500
 *                 description: Una breve descripción del curso (debe permitir ciertos signos de puntuación).
 *               alumnos:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 100
 *                 description: El número de alumnos inscritos en el curso.
 *               calificacion:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 maximum: 10
 *                 description: La calificación promedio del curso.
 *               usuarios:
 *                 type: array
 *                 items:
 *                   type: string
 *                   minLength: 24
 *                   maxLength: 24
 *                   description: ID de usuario asociado al curso (debe tener 24 caracteres).
 *               activo:
 *                 type: boolean
 *                 description: Indica si el curso está activo o no.
 *               fechaActualizacion:
 *                 type: string
 *                 format: date
 *                 description: La fecha de la última actualización del curso (se puede establecer automáticamente).
 *     responses:
 *       200:
 *         description: Curso actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 titulo:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 alumnos:
 *                   type: integer
 *                 calificacion:
 *                   type: number
 *                   format: float
 *                 usuarios:
 *                   type: array
 *                   items:
 *                     type: string
 *                     minLength: 24
 *                     maxLength: 24
 *                 activo:
 *                   type: boolean
 *                 fechaCreacion:
 *                   type: string
 *                   format: date
 *                 fechaActualizacion:
 *                   type: string
 *                   format: date
 *               required:
 *                 - id
 *                 - titulo
 *                 - descripcion
 *                 - alumnos
 *                 - calificacion
 *                 - activo
 *                 - fechaCreacion
 *                 - fechaActualizacion
 *             example:
 *               id: "60d5ec49b3f1c2b5c8b6a5f0"
 *               titulo: "Introducción a la Programación Actualizado"
 *               descripcion: "Curso básico de programación utilizando Python. Ahora con más contenido."
 *               alumnos: 35
 *               calificacion: 8.7
 *               usuarios: 
 *                 - "60d5ec49b3f1c2b5c8b6a5f0"
 *                 - "60d5ec49b3f1c2b5c8b6a5f1"
 *               activo: true
 *               fechaCreacion: "2024-09-01"
 *               fechaActualizacion: "2024-09-10"
 */
/**
 * @swagger
 * /api/cursos/{id}:
 *   delete:
 *     summary: Desactivar un curso por ID
 *     tags:
 *       - Cursos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: El ID del curso a desactivar.
 *     responses:
 *       200:
 *         description: Curso desactivado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación de la desactivación.
 *                 id:
 *                   type: string
 *                   description: El ID del curso que fue desactivado.
 *               required:
 *                 - message
 *                 - id
 *             example:
 *               message: "Curso desactivado exitosamente."
 *               id: "60d5ec49b3f1c2b5c8b6a5f0"
 */
ruta.delete('/:id', desactivarCurso);
/**
 * @swagger
 * /api/cursos/{id}:
 *   get:
 *     summary: Obtener un curso por ID
 *     tags:
 *       - Cursos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: El ID del curso que se desea obtener.
 *     responses:
 *       200:
 *         description: Curso encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: El ID del curso.
 *                 titulo:
 *                   type: string
 *                   description: El título del curso.
 *                 descripcion:
 *                   type: string
 *                   description: Una breve descripción del curso.
 *                 alumnos:
 *                   type: integer
 *                   description: El número de alumnos inscritos en el curso.
 *                 calificacion:
 *                   type: number
 *                   format: float
 *                   description: La calificación promedio del curso.
 *                 usuarios:
 *                   type: array
 *                   items:
 *                     type: string
 *                     minLength: 24
 *                     maxLength: 24
 *                     description: ID de usuario asociado al curso (debe tener 24 caracteres).
 *                 activo:
 *                   type: boolean
 *                   description: Indica si el curso está activo o no.
 *                 fechaCreacion:
 *                   type: string
 *                   format: date
 *                   description: La fecha de creación del curso.
 *                 fechaActualizacion:
 *                   type: string
 *                   format: date
 *                   description: La fecha de la última actualización del curso.
 *               required:
 *                 - id
 *                 - titulo
 *                 - descripcion
 *                 - alumnos
 *                 - calificacion
 *                 - activo
 *                 - fechaCreacion
 *                 - fechaActualizacion
 *             example:
 *               id: "60d5ec49b3f1c2b5c8b6a5f0"
 *               titulo: "Introducción a la Programación"
 *               descripcion: "Curso básico de programación utilizando Python."
 *               alumnos: 30
 *               calificacion: 8.5
 *               usuarios: 
 *                 - "60d5ec49b3f1c2b5c8b6a5f0"
 *               activo: true
 *               fechaCreacion: "2024-09-01"
 *               fechaActualizacion: "2024-09-02"
 */
ruta.get('/:id', obtenerCurso);
/**
 * @swagger
 * /api/cursos/{id}/usuarios:
 *   get:
 *     summary: Obtener usuarios de un curso
 *     tags:
 *       - Cursos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: El ID del curso del cual se desean obtener los usuarios.
 *     responses:
 *       200:
 *         description: Lista de usuarios del curso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     minLength: 24
 *                     maxLength: 24
 *                     description: El ID único del usuario.
 *                   nombre:
 *                     type: string
 *                     description: El nombre completo del usuario.
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: El correo electrónico del usuario.
 *                   rol:
 *                     type: string
 *                     description: El rol del usuario en el curso.
 *                 required:
 *                   - id
 *                   - nombre
 *                   - email
 *                   - rol
 *             example:
 *               - id: "60d5ec49b3f1c2b5c8b6a5f0"
 *                 nombre: "John Doe"
 *                 email: "john@example.com"
 *                 rol: "Estudiante"
 *               - id: "60d5ec49b3f1c2b5c8b6a5f1"
 *                 nombre: "Jane Smith"
 *                 email: "jane@example.com"
 *                 rol: "Profesor"
 */
ruta.get('/:id/usuarios', obtenerUsuariosDeCurso)
/**
 * @swagger
 * /api/cursos/{id}/usuarios:
 *   put:
 *     summary: Agregar usuarios a un curso
 *     tags:
 *       - Cursos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: El ID del curso al que se desean agregar usuarios.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarios:
 *                 type: array
 *                 items:
 *                   type: string
 *                   minLength: 24
 *                   maxLength: 24
 *                   description: El ID del usuario a agregar (debe tener 24 caracteres).
 *             required:
 *               - usuarios
 *     responses:
 *       200:
 *         description: Usuarios agregados al curso exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación de la adición de usuarios.
 *                 usuariosAgregados:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: IDs de los usuarios que fueron agregados.
 *               required:
 *                 - message
 *                 - usuariosAgregados
 *             example:
 *               message: "Usuarios agregados exitosamente."
 *               usuariosAgregados:
 *                 - "60d5ec49b3f1c2b5c8b6a5f0"
 *                 - "60d5ec49b3f1c2b5c8b6a5f1"
 */
ruta.put('/:id/usuarios', agregarUsuariosController);


module.exports = ruta;