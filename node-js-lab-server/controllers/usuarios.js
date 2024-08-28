



const express = require('express');

const Joi = require('@hapi/joi');
const ruta = express.Router();
const logic = require ('../logic/usuario_logic');
/*
//Validaciones para el objeto usuario
const schema = Joi.object({
    nombre: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^[A-Za-záéíóú ]{3,30}$/),


    password: Joi.string()
    .pattern(/^[A-Za-záéíóú ]{3,30}$/),


    email: Joi.string()
    .email({ 
        minDomainSegments: 2,
        tlds:{allow:['com', 'net', 'edu', 'co']}})
    });
*/
    /*

//Funcion asincrona para crear un objeto de tipo usuario
async function crearUsuario(body) {
    let usuario = new Usuario({
        email      : body.email,
        nombre     : body.nombre,
        password   : body.password

    });
    return await usuario.save()
}
    */
/*
ruta.get('/', (req,res)=>{
    res.json('Respuesta a peticion GET se USUARIOS funcionando correctamente...')
})
    */

//Endpoint de tipo post para el recurso USUARIOS
ruta.post('/', (req, res) => {
    let body = req.body;
    const {error, value} = logic.schema.validate({nombre: body.nombre, email: body.email});
    if (!error){
        let resultado = crearUsuario(body);

        resultado .then(user =>{
            res.json({
                valor: user
            })
        }).catch(err =>{
            res.status(400).json({
                err
            })
        });
    }else{
        res.status(400).json({
            error
        })
    }
});
/*
//Funcion para actuarlizar al usuario
async function actualizarUsuario(email, body) {
        let usuario = await Usuario.findOneAndUpdate
        (
            {"email":email},{
                $set:{
                    nombre:body.nombre,
                    password: body.password
                }
            
            }, {new: true}
        );
        return usuario;
}
*/
//Endpoint de tipo put para actualizar los datos del usuario
ruta.put('/:email', (req, res) =>{
    const {error, value} = logic.schema.validate({nombre: req.body.nombre})
    if(!error){
        let resultado = logic.actualizarUsuario(req.params.email, req.body);
        resultado.then(valor =>{
            res.json({
                message:'Usuario actualizado exitosamente',
                data:valor
            });
        }).catch(err =>{
            res.status(400).json({
                message:'Error al actualizar el usuario',
                error:err.message
            });
        });
    }else{
        res.status(400).json({
            error
        })
    }
});



/*
async function desactivarUsuario(email) {
        let usuario = await Usuario.findOneAndUpdate({"email":email},{
            $set:{
                estado: false
            }
        },
        {new:true}
    );
    return usuario;    
}
*/
//Endpoint de tipo DELETE para el recurso USUARIOS
ruta.delete('/:email', (req, res)=>{
    let resultado = logic.desactivarUsuario(req.params.email);
    resultado.then(valor =>{
        res.json({
            message:'Exito al desactivar al usuario',
            usuario: valor
        })
    }).catch(err =>{
        res.status(400).json({
            message:'Error al desactivar al usuario',
            error:err.message
        })
    });
});
/*
//Funcion asincrona para listar todos los usuarios activos
async function listarUsuariosActivos() {
    let usuarios = await Usuario.find({"estado": true});
    return usuarios;
}*/

//Endpoint de tipo GET para el recurso usuarios. Lista todos los usuarios
ruta.get('/', (req, res)=>{
    let resultado = logic.listarUsuariosActivos();
    resultado.then(usuarios =>{
        res.json(usuarios)
    }).catch(err=>{
        res.status(400).json({
            message:'Error al listar los usuarios activos',
            error:err.message
        })
    })
})

module.exports = ruta;