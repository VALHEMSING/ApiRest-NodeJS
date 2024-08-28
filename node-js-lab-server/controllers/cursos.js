



const express = require('express');
const Curso =  require('../models/cursos_models');
const ruta = express.Router();


ruta.get('/', (req, res) =>{
    res.json('Respuesta a peticion Get de CURSOS funcionando correctamente...');
});




module.exports = ruta;