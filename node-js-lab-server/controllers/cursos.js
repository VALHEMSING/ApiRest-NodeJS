



const express = require('express');

const ruta = express.Router();
const logic = require('../logic/curso_logic')

/*
ruta.get('/', (req, res) =>{
    res.json('Respuesta a peticion Get de CURSOS funcionando correctamente...');
});
*/


//Endpoint de tipo POST para el recurso CURSOS
ruta.post('/', (req, res)=>{
    let resultado = logic.crearCurso(req.body);
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




//Endpoint de tipos PUT para actualizar los cursos
ruta.put('/:id', (req, res)=>{
    let resultado = logic.actualizarCurso(req.params.id, req.body);
    resultado.then(curso =>{
        res.json(curso)
    }).catch(err=>{
        res.status(400).json(err)
    })
});




//Endpoindt de tipo DELETE para desacticar cursos
ruta.delete('/:id', (req, res)=>{
    let resultado = logic.desactivarCurso(req.params.id);
    resultado.then(curso =>{
        res.json(curso);
    }).catch(err =>{
        res.status(400).json(ert);
    })
})




//Endpoint tipo GET paral listar los cursos activos
ruta.get('/', (req, res)=>{
    let resultado = logic.listarCursosActivos();
    resultado.then(cursos =>{
        res.json(cursos);
    }).catch(err=>{
        res.status(400).json(err);
    })
})

module.exports = ruta;