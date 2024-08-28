



const express = require('express');

const ruta = express.Router();

const logic = require('../logic/usuario_logic')



/*
ruta.get('/', (req,res)=>{
    res.json('Respuesta a peticion GET se USUARIOS funcionando correctamente...')
})
    */

//Endpoint de tipo post para el recurso USUARIOS
ruta.post('/', (req, res) => {
    let body = req.body;
    const { error, value } = logic.schema.validate({ nombre: body.nombre, email: body.email });
    if (!error) {
        let resultado = logic.crearUsuario(body);

        resultado.then(user => {
            res.json({
                valor: user
            })
        }).catch(err => {
            res.status(400).json({
                err
            })
        });
    } else {
        res.status(400).json({
            error
        })
    }
});

//Endpoint de tipo put para actualizar los datos del usuario
ruta.put('/:email', (req, res) => {
    const { error, value } = logic.schema.validate({ nombre: req.body.nombre })
    if (!error) {
        let resultado = logic.actualizarUsuario(req.params.email, req.body);
        resultado.then(valor => {
            res.json({
                message: 'Usuario actualizado exitosamente',
                data: valor
            });
        }).catch(err => {
            res.status(400).json({
                message: 'Error al actualizar el usuario',
                error: err.message
            });
        });
    } else {
        res.status(400).json({
            error
        })
    }
});





//Endpoint de tipo DELETE para el recurso USUARIOS
ruta.delete('/:email', (req, res) => {
    let resultado = logic.desactivarUsuario(req.params.email);
    resultado.then(valor => {
        res.json({
            message: 'Exito al desactivar al usuario',
            usuario: valor
        })
    }).catch(err => {
        res.status(400).json({
            message: 'Error al desactivar al usuario',
            error: err.message
        })
    });
});


//Endpoint de tipo GET para el recurso usuarios. Lista todos los usuarios
ruta.get('/', (req, res) => {
    let resultado = logic.listarUsuariosActivos();
    resultado.then(usuarios => {
        res.json(usuarios)
    }).catch(err => {
        res.status(400).json({
            message: 'Error al listar los usuarios activos',
            error: err.message
        })
    })
})

module.exports = ruta;