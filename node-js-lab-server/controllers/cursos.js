



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


//Funcion asincrona para actualizar cursos
async function actualizarCurso(id, body){
        let curso = await Curso.findByIdAndUpdate(id,{
            $set:{
                titulo: body.titulo,
                descripcion: body.descripcion
            }
        },{new:true});
    return curso;
}


//Endpoint de tipos PUT para actualizar los cursos
ruta.put('/:id', (req, res)=>{
    let resultado = actualizarCurso(req.params.id, req.body);
    resultado.then(curso =>{
        res.json(curso)
    }).catch(err=>{
        res.status(400).json(err)
    })
});

module.exports = ruta;