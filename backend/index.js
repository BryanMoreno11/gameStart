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
const ventaRoutes = require('./routes/ventaRoutes');
const correoRoutes = require('./routes/correoRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const ciudadesRoutes = require('./routes/ciudadesRoutes');
const empleadosRoutes = require('./routes/empleadosRoutes');
const sucursalesRoutes = require('./routes/sucursalesRoutes');
const puestosRoutes = require('./routes/puestosRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const proveedoresRoutes = require('./routes/proveedoresRoutes');
const videojuego_plataformaRoutes = require('./routes/videojuego_plataformaRoutes');


app.use('/api', plataformaRoutes);
app.use('/api', videojuegoRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', verifyRoutes);
app.use('/api', ventaRoutes);
app.use('/api', correoRoutes);
app.use('/api', clientesRoutes);
app.use('/api', ciudadesRoutes);
app.use('/api', empleadosRoutes);
app.use('/api', sucursalesRoutes);
app.use('/api', puestosRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', pedidosRoutes);
app.use('/api', proveedoresRoutes);
app.use('/api', videojuego_plataformaRoutes);
//Inicio del proyecto
app.listen("3000");
console.log("server up localhost:3000");
