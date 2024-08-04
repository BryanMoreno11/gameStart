const { Router } = require('express');
const router = new Router();
const { getPedidos, addPedido, updatePedido } = require('../controllers/pedidosController');

router.get('/pedidos', getPedidos);
router.post('/pedidos', addPedido);
router.put('/pedidos/:id', updatePedido);

module.exports = router;
