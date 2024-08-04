const { Router } = require("express");
const router = new Router();
var { getCiudades } = require('../controllers/ciudadController');
router.get('/ciudades', getCiudades);
module.exports = router;