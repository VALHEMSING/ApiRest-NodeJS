



const express = require('express');

const ruta = express.Router();
const logic = require('../logic/curso_logic')

/*
ruta.get('/', (req, res) =>{
    res.json('Respuesta a peticion Get de CURSOS funcionando correctamente...');
});
*/


//Endpoint de tipo POST para el recurso CURSOS
ruta.post('/', async (req, res) => {
    try {
        const resultado = await logic.crearCurso(req.body);
        res.status(201).json({ curso: resultado });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    /*
        let body = req.body;
    
        const { error, value } = logic.schema.validate({
            titulo: body.titulo,
            descripcion: body.descripcion,
            alumnos: body.alumnos,
            calificacion: body.calificacion
        });
    
        if (!error) {
            let resultado = logic.crearCurso(req.body);
            resultado.then(curso => {
                res.json({
                    curso
                })
            }).catch(err => {
                res.status(400).json({
                    err
                })
            })
        } else {
            res.status(400).json({
                error
            })
        }
    */

});




//Endpoint de tipos PUT para actualizar los cursos
ruta.put('/:id', async (req, res) => {

    try {
        const resultado = await logic.actualizarCurso(req.params.id, req.body);
        res.json(resultado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    /*
    const { error, value } = logic.schema.validate({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        alumnos: req.body.alumnos,
        calificacion: req.body.calificacion
    })
    if (!error) {
        let resultado = logic.actualizarCurso(req.params.id, req.body);
        resultado.then(curso => {
            res.json(curso)
        }).catch(err => {
            res.status(400).json(err)
        });
    }
    else {
        res.status(400).json({
            error
        })
    }
        */
});




//Endpoindt de tipo DELETE para desacticar cursos
ruta.delete('/:id', (req, res) => {
    let resultado = logic.desactivarCurso(req.params.id);
    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(ert);
    })
})




//Endpoint tipo GET paral listar los cursos activos
ruta.get('/', (req, res) => {
    let resultado = logic.listarCursosActivos();
    resultado.then(cursos => {
        res.json(cursos);
    }).catch(err => {
        res.status(400).json(err);
    })
})

module.exports = ruta;