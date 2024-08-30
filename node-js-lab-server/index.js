
const usuarios = require('./controllers/usuarios');
const cursos = require('./controllers/cursos');






const express = require('express');
const mongoose = require('mongoose');

//Conexion a la DB mongodb
mongoose.connect('mongodb+srv://cluster0.vanve.mongodb.net', {

})
  .then(() => console.log('Conectando a MongoDB...'))
  .catch(err => console.log('No se pudo conectar con MongoDB...', err));


//Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

