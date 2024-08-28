



const { required } = require('@hapi/joi');
const mongoose = require('mongoose');




const usuarioSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    nombre:{
        type:String,
        required: true
    },
    password:{
        type:String,
        
    }
})