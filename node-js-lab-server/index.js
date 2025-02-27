const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//Importar la semilla
const seedDatabase = require('./seed/seeds')
// Cargar el archivo dotenv para las variables de entorno
require('dotenv').config();

// Importar las rutas
const usuarioRouter = require('./routes/usuarioRouter');
const cursosRouter = require('./routes/cursosRouter');

// Importar swagger UI express
const { swaggerUi, specs } = require('./swagger/swagger');

// Almacenar la conexión de la base de datos
const CONEXION = process.env.MONGO_CONECCTION;

console.log(`\nEscuchando la DB ${CONEXION}\n`);

// Conectar a la base de datos MongoDB
mongoose.connect(CONEXION)
    .then(() => {
        console.log('Conectado a MongoDB')
        console.log('\nAgregando semilla de DB\n')
        //Invocamos las semillas
        seedDatabase();

    })
    .catch(err => console.error('No se pudo conectar a MongoDB', err));

// Crear la aplicación de Express
const app = express();

// Configurar CORS de manera avanzada
const corsOptions = {
    origin: '*', // Reemplaza con los dominios permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true, // Permite el envío de cookies
    preflightContinue: false, // Si es true, se omite la respuesta del preflight
    optionsSuccessStatus: 204 // Para ciertos navegadores antiguos
};

// Habilitar CORS para todas las rutas
app.use(cors(corsOptions));

// Cargar certificados SSL y clave privada
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
};

// Configuraciones de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar ruta de Swagger
app.use('/swagger_docs', swaggerUi.serve, swaggerUi.setup(specs));

// Definir las rutas principales
app.use('/api/usuarios', usuarioRouter);
app.use('/api/cursos', cursosRouter);

// Definir el puerto y arrancar el servidor HTTPS
const port = process.env.PORT || 3000;

https.createServer(sslOptions, app).listen(port, () => {
    console.log(`Servidor HTTPS escuchando en https://localhost:${port}`);
    console.log(`\nAPI REST ejecutándose correctamente...\n`);
});
