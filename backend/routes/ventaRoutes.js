const { Router } = require("express");
const router = new Router();
var { createVenta, createVentaDetalle} = require('../controllers/ventaController');
router.post('/venta',createVenta);
router.post('/ventadetalle',createVentaDetalle);
module.exports = router;