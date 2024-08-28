const Usuario = require('../models/usuario_model');
const usuarioValidationSchema = require('../validations/usuarioValidations');





//Funcion asincrona para crear un objeto de tipo usuario
async function crearUsuario(body) {

    const { error } = usuarioValidationSchema.validate(body);

    if (error) {
        throw new Error(error.details[0].message);
    }
    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: body.password

    });
    return await usuario.save()
}


//Funcion para actuarlizar al usuario
async function actualizarUsuario(email, body) {


    const { error } = usuarioValidationSchema.validate(email, body);
    if (error) {
        throw new Error(error.details[0].message);
    }
    let usuario = await Usuario.findOneAndUpdate
        (
            { "email": email },
            {
                $set: {
                    nombre: body.nombre,
                    password: body.password
                }

            }, { new: true }
        );
    return usuario;
}


async function desactivarUsuario(email) {
    let usuario = await Usuario.findOneAndUpdate({ "email": email }, {
        $set: {
            estado: false
        }
    },
        { new: true }
    );
    return usuario;
}

//Funcion asincrona para listar todos los usuarios activos
async function listarUsuariosActivos() {
    let usuarios = await Usuario.find({ "estado": true });
    return usuarios;
}

module.exports = {

    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    listarUsuariosActivos
}