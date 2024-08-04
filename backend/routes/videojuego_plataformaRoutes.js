const { Router } = require('express');
const router = new Router();
const { getVideojuegoPlataformas, addVideojuegoPlataforma, updateVideojuegoPlataforma } = require('../controllers/videojuego_plataformaController');

router.get('/videojuego-plataformas', getVideojuegoPlataformas);
router.post('/videojuego-plataformas', addVideojuegoPlataforma);
router.put('/videojuego-plataformas/:id', updateVideojuegoPlataforma);

module.exports = router;
