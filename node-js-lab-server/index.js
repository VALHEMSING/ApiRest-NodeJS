const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Importar rutas
const usuariosRouter = require('./api/routes/usuarioRouter'); // Verifica que esta ruta sea correcta
const cursosRouter = require('./api/routes/cursosRouter'); // Verifica que esta ruta sea correcta

// Resto del código...

require('dotenv').config();



const MONGOCONECCION = process.env.MONGO_DB_CONNECTION_STRING;
//Conexion a la DB mongodb
(async () => {
  try {
    await mongoose.connect(MONGOCONECCION);
    console.log('Conectando a MongoDB...');
  } catch (err) {
    console.log('No se pudo conectar con MongoDB...', err);
  }
})();


//Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/usuarios',usuariosRouter );
app.use('/api/cursos', cursosRouter);





const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

