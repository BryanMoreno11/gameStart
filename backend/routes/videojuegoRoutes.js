const { Router } = require("express");
const router = new Router();
var { getVideojuegos, getVideojuego, getVideojuegosRecientes} = require('../controllers/videojuegoController');
router.get('/videojuegos', getVideojuegos);
router.get('/videojuego/:id', getVideojuego);
router.get('/videojuegos/recientes', getVideojuegosRecientes);
module.exports = router;