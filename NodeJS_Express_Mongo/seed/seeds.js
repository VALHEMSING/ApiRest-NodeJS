const mongoose = require('mongoose');
const Curso = require('../models/curso_model')
const Usuario = require('../models/usuario_model')

const usuariosData = [
    {
      email: "juan.perez@example.com",
      nombre: "Juan Pérez",
      password: "password123",
      estado: true,
      imagen: "https://example.com/juan_perez.jpg",
    },
    {
      email: "maria.lopez@example.com",
      nombre: "María López",
      password: "password456",
      estado: true,
      imagen: "https://example.com/maria_lopez.jpg",
    },
    {
      email: "carlos.garcia@example.com",
      nombre: "Carlos García",
      password: "password789",
      estado: true,
      imagen: "https://example.com/carlos_garcia.jpg",
    },
    {
      email: "ana.martinez@example.com",
      nombre: "Ana Martínez",
      password: "password321",
      estado: false,
      imagen: "https://example.com/ana_martinez.jpg",
    },
    {
      email: "pedro.sanchez@example.com",
      nombre: "Pedro Sánchez",
      password: "password654",
      estado: true,
      imagen: "https://example.com/pedro_sanchez.jpg",
    },
  ];

  const cursosData = [
    {
      titulo: "Introducción a React.JS",
      descripcion: "Curso básico sobre React.JS",
      estado: true,
      imagen: "https://example.com/react.png",
      alumnos: 20,
      calificacion: 4.7,
    },
    {
      titulo: "Desarrollo Web con HTML y CSS",
      descripcion: "Curso completo sobre desarrollo web",
      estado: true,
      imagen: "https://example.com/html_css.png",
      alumnos: 25,
      calificacion: 4.8,
    },
    {
      titulo: "JavaScript Moderno",
      descripcion: "Aprende JavaScript desde cero",
      estado: true,
      imagen: "https://example.com/javascript.png",
      alumnos: 15,
      calificacion: 4.9,
    },
    {
      titulo: "Node.js para Principiantes",
      descripcion: "Curso introductorio sobre Node.js",
      estado: true,
      imagen: "https://example.com/nodejs.png",
      alumnos: 30,
      calificacion: 4.6,
    },
    {
      titulo: "Bases de Datos con MongoDB",
      descripcion: "Aprende cómo trabajar con MongoDB",
      estado: true,
      imagen: "https://example.com/mongodb.png",
      alumnos: 22,
      calificacion: 4.5,
    },
  ];

  async function seedDatabase() {
    try {
      // Crear cursos si no existen
      for (const cursoData of cursosData) {
        const cursoExistente = await Curso.findOne({ titulo: cursoData.titulo });
        if (!cursoExistente) {
          await Curso.create(cursoData);
          console.log(`Curso "${cursoData.titulo}" creado.`);
        } else {
          console.log(`Curso "${cursoData.titulo}" ya existe.`);
        }
      }
  
      // Crear usuarios si no existen
      for (const usuarioData of usuariosData) {
        const usuarioExistente = await Usuario.findOne({ email: usuarioData.email });
        if (!usuarioExistente) {
          await Usuario.create(usuarioData);
          console.log(`Usuario "${usuarioData.email}" creado.`);
        } else {
          console.log(`Usuario "${usuarioData.email}" ya existe.`);
        }
      }
    } catch (error) {
      console.error('Error al sembrar la base de datos:', error);
    }
  }

  module.exports = seedDatabase;