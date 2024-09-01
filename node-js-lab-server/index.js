// index.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const usuarioRouter = require('./routes/usuarioRouter') 
//const usuariosRouter = require('./api/routes/usuarioRouter');
const cursosRouter = require('./routes/cursosRouter');

const MONGOCONECCION = process.env.MONGO_DB_CONNECTION_STRING;

(async () => {
  try {
    await mongoose.connect(MONGOCONECCION);
    console.log('Conectado a MongoDB...');
  } catch (err) {
    console.error('No se pudo conectar a MongoDB', err);
  }
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/usuarios', usuarioRouter);
app.use('/cursos', cursosRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
