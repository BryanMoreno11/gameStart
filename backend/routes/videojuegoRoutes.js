const { Router } = require("express");
const router = new Router();
var { getVideojuegos, getVideojuego } = require('../controllers/videojuegoController');
router.get('/videojuegos', getVideojuegos);
router.get('/videojuego/:id', getVideojuego);
module.exports = router;