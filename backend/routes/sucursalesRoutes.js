const { Router } = require('express');
const router = new Router();
const { getSucursales } = require('../controllers/sucursalesController');

router.get('/sucursales', getSucursales);

module.exports = router;
