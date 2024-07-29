const { Router } = require("express");
const router = new Router();
var { topVideojuegosCantidadVentas, topVideojuegosRecaudacion } = require('../controllers/dashboardController');
router.get('/dashboard/videojuegosventas', topVideojuegosCantidadVentas);
router.get('/dashboard/videojuegosrecaudacion', topVideojuegosRecaudacion);
module.exports=router;