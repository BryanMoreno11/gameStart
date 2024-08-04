const { Router } = require('express');
const router = new Router();
var { getPuestos } = require('../controllers/puestosController');

router.get('/puestos', getPuestos);

module.exports = router;
