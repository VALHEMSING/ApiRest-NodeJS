
//Traemos el archivo dotenv
//require('dotenv').config();

const express = require('express');
//const mongoose = require('mongoose');


const usuarioRouter = require('./routes/usuarioRouter');
const cursosRouter = require('./routes/cursosRouter');

require('dotenv').config();
const mongoose = require('mongoose');

//Almaceno la conexin de la DB
const CONEXION = process.env.MONGO_CONNECTION_STRING

console.log(`Escuchando la DB ${CONEXION}`)

mongoose.connect(CONEXION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('No se pudo conectar a MongoDB', err));
;


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/usuarios', usuarioRouter);
app.use('/cursos', cursosRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});