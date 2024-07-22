const { Router } = require("express");
const router = new Router();
var { createVenta, createVentaDetalle, getVenta, getVentaDetalle} = require('../controllers/ventaController');
router.post('/venta',createVenta);
router.post('/ventadetalle',createVentaDetalle);
router.get('/venta/:id',getVenta);
router.get('/ventadetalle/:id',getVentaDetalle);
module.exports = router;