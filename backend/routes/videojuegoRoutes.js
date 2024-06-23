const { Router } = require("express");
const router = new Router();
var { getVideojuegos } = require('../controllers/videojuegoController');
router.get('/videojuegos', getVideojuegos);
module.exports = router;