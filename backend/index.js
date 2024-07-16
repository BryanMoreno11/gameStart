const express = require('express');
const app = express();
const cors = require('cors');
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//rutas
const plataformaRoutes = require('./routes/plataformaRoutes');
const videojuegoRoutes = require('./routes/videojuegoRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const verifyRoutes = require('./routes/verifyRoutes');
app.use('/api', plataformaRoutes);
app.use('/api', videojuegoRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', verifyRoutes);
//Inicio del proyecto
app.listen("3000");
console.log("server up localhost:3000");