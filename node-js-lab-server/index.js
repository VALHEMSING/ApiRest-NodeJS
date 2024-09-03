
//Traemos el archivo dotenv
//require('dotenv').config();

const express = require('express');
//const mongoose = require('mongoose');


const usuarioRouter = require('./routes/usuarioRouter');
const cursosRouter = require('./routes/cursosRouter');

require('dotenv').config();
const mongoose = require('mongoose');



//Importar el swagger UI express
const { swaggerUi, specs } = require('./swagger/swagger');


//Almaceno la conexin de la DB
const CONEXION = process.env.MONGO_CONNECTION_STRING

console.log(`Escuchando la DB ${CONEXION}`)

mongoose.connect(CONEXION, )
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('No se pudo conectar a MongoDB', err));



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Configurar Ruta del swagger
app.use('/swagger_docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/usuarios', usuarioRouter);
app.use('/api/cursos', cursosRouter);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});