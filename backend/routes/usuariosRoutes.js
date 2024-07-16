const { Router } = require("express");
const router = new Router();
var { getUsuario, createUsuario, getUsuarioLogin, verifyLogin } = require('../controllers/usuariosController');
router.get('/usuario/:id', getUsuario);
router.post('/usuario/login', getUsuarioLogin);
router.get('/usuario/verify', verifyLogin);
router.get('/usuario', getUsuario);
router.post('/usuario', createUsuario);
module.exports = router;