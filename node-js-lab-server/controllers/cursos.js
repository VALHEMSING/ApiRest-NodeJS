



const express = require('express');
const Curso =  require('../models/cursos_models');
const ruta = express.Router();


ruta.get('/', (req, res) =>{
    res.json('Respuesta a peticion Get de CURSOS funcionando correctamente...');
});


//Funcin asincrona para crear cursos
async function crearCurso(body){
    let curso = new Curso({
        titulo  :body.titulo,
        descripcion : body.descripcion,
        alumnos     : body.alumnos,
        calificacion : body.calificacion
    })
    return await curso.save();
}
//Endpoint de tipo POST para el recurso CURSOS
ruta.post('/', (req, res)=>{
    let resultado = crearCurso(req.body);
    resultado.then(curso=>{
        res.json({
            curso
        })
    }).catch(err =>{
        res.status(400).json({
            err
        })
    })
});

module.exports = ruta;