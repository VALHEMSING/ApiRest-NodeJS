
// traemos el archivo dotenv
require('dotenv').config();

//const usuarios = require('./controllers/usuarios')
//const cursos = require('./controllers/cursos')
const seedDatabase = require('./seed/seeds')
const usuarioRoutes = require('./routes/usuario_routes');
const cursoRoutes = require('./routes/curso_routes');

const express = require('express');
const mongoose = require('mongoose');

//Https
const https = require('https')
const fs = require('fs')
const path = require('path')

// Importa el paquete cors
const cors = require('cors'); 

// Importar la configuración de Swagger
const { swaggerUi, swaggerDocs } = require('./swagger/swagger');

// Obtener la cadena de conexión desde las variables de entorno
const connectionString = process.env.MONGO_DB_CONNECTION_STRING;

// Conexión a la base de datos mongodb
mongoose.connect(connectionString)
    .then(() => {
        console.log('Conectado a MongoDB...');
        // Llamamos a la función para sembrar la base de datos aquí
        seedDatabase(); 
    })
    .catch(err => console.log('No se pudo conectar con MongoDB...', err));
    
// middleware
const app = express();

//Cargar el certificado SSL y la clave privada

const options = {
  key: fs.readFileSync(path.join(__dirname,'ssl', 'privatekey.pem')),
  cert: fs.readFileSync(path.join(__dirname,'ssl', 'certificate.pem')),
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración básica de CORS (permite todas las solicitudes de cualquier origen)
//app.use(cors());

// Opcional: configuración avanzada de CORS

const corsOptions = {
  origin: '*', // Reemplaza con el dominio que quieres permitir
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  //credentials: true, // Permitir el envío de cookies
};

app.use(cors(corsOptions)); // Habilita cors con las opciones especificas
app.use('*', cors(corsOptions)) // habilita CORDS Pre-Fligth


// Configuración de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// end points (recursos)
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cursos', cursoRoutes);


const port = process.env.PORT || 3000;
// servidor https
https.createServer(options, app).listen(port, () => {
  console.log('Api REST Ok, y ejecutándose...');
  console.log(`Servidor HTTPS corriendo en  https://localhost:${port}`);
});
/*
// servidor normal
app.listen(port, () => {
    console.log('Api REST Ok, y ejecutándose...');
    console.log(`Usando la ruta http://localhost:${port}`);
});*/
