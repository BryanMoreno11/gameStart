const { Router } = require("express");
const router = new Router();
var { topVideojuegosCantidadVentas, topVideojuegosRecaudacion, topGenerosCantidadVentas, topGenerosRecaudacion,
    topPlataformasCantidadVentas, topPlataformasRecaudacion, cantidadPedidosProveedor, recaudacionPedidosProveedor
 } = require('../controllers/dashboardController');
router.get('/dashboard/videojuegosventas', topVideojuegosCantidadVentas);
router.get('/dashboard/videojuegosrecaudacion', topVideojuegosRecaudacion);
router.get('/dashboard/generosventas', topGenerosCantidadVentas);
router.get('/dashboard/generosrecaudacion', topGenerosRecaudacion);
router.get('/dashboard/plataformasventas', topPlataformasCantidadVentas);
router.get('/dashboard/plataformasrecaudacion', topPlataformasRecaudacion);
router.get('/dashboard/cantidadproveedor', cantidadPedidosProveedor);
router.get('/dashboard/recaudacionproveedor', recaudacionPedidosProveedor);

module.exports=router;