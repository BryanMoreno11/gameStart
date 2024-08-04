const { Router } = require("express");
const router = new Router();
var { getCliente, getClienteNombre, createCliente, getClienteLogin, verifyLogin } = require('../controllers/clientesController');
router.get('/cliente/:id', getCliente);
router.get('/clientenombre/:nombre', getClienteNombre);
router.post('/cliente/login', getClienteLogin);
router.get('/cliente/verify', verifyLogin);
router.post('/cliente', createCliente);
module.exports = router;