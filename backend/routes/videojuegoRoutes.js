const { Router } = require("express");
const router = new Router();
const { getVideojuegos, getVideojuego, getVideojuegosRecientes, addVideojuego, updateVideojuego, getVideojuegoNormal, getVideojuegosNormal } = require('../controllers/videojuegoController');

router.get('/videojuegos', getVideojuegos);
router.get('/videojuego/:id', getVideojuego);
router.get('/videojuegos/recientes', getVideojuegosRecientes);
router.post('/videojuego', addVideojuego);
router.put('/videojuego/:id', updateVideojuego);
router.get('/videojuego/normal/:id', getVideojuegoNormal);
router.get('/videojuegos/normal', getVideojuegosNormal);
module.exports = router;
