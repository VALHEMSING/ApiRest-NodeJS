// index.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const usuarioRouter = require('./routes/usuarioRouter') 
//const usuariosRouter = require('./api/routes/usuarioRouter');
const cursosRouter = require('./routes/cursosRouter');

(async () => {
  try {
    const MONGOCONECCION = process.env.MONGOCONECCION;
    await mongoose.connect(MONGOCONECCION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB...');
  } catch (err) {
    console.error('No se pudo conectar a MongoDB', err.message);
  } finally {
    // Cerrar la conexión si es necesario
    await mongoose.disconnect();
  }
})();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/usuarios', usuarioRouter);
app.use('/cursos', cursosRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
