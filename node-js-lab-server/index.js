const https = require ('https');
const fs = require ('fs');
const path = require ('path');  

// Traemos el archivo dotenv
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Importar las rutas
const usuarioRouter = require('./routes/usuarioRouter');
const cursosRouter = require('./routes/cursosRouter');

// Importar el swagger UI express
const { swaggerUi, specs } = require('./swagger/swagger');

// Importar CORS
const cors = require('cors');

// Almaceno la conexión de la DB
const CONEXION = process.env.MONGO_CONNECTION_STRING;

console.log(`\nEscuchando la DB ${CONEXION}\n`);

mongoose.connect(CONEXION)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));



const app = express();

// Configurar CORS de manera avanzada
const corsOptions = {
  origin: ['https://localhost:3000', 'https://anotherdomain.com'], // Reemplaza con los dominios permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  credentials: true, // Permite el envío de cookies
  preflightContinue: false, // Si es true, se omite la respuesta del preflight
  optionsSuccessStatus: 204 // Para ciertos navegadores antiguos
};


// Configurar CORS
app.use(cors(corsOptions)); // Esto habilita CORS para todas las ruta

//Cargar certificador SSL y la clave privada
const options = {
  key: fs.readFileSync(path.join(__dirname, 'ssl','server.key')),
  cert: fs.readFileSync(path.join(__dirname,'ssl','server.crt')),
} 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Ruta del swagger
app.use('/swagger_docs', swaggerUi.serve, swaggerUi.setup(specs));

// Definir las rutas
app.use('/api/usuarios', usuarioRouter);
app.use('/api/cursos', cursosRouter);

const port = process.env.PORT || 3000;
/*
app.listen(port, () => {
    console.log(`Servidor escuchando en https://localhost:${port}`);
    console.log()
});
*/
https.createServer(options,app).listen(port, ()=>{
  console.log(`Servidor HTTPS escuchando en https://localhost:${port}`);
    console.log(`\nAPI REST ejecutandose correctamente...\n`)
})