const { Router } = require("express");
const router = new Router();
var { getPlataformas, getPlataforma, createPlataforma, updatePlataforma, deletePlataforma } = require('../controllers/plataformaController');
router.get('/plataformas', getPlataformas);
router.get('/plataforma/:id', getPlataforma);
router.post('/plataforma',createPlataforma);
router.put('/plataforma/:id',updatePlataforma);
router.delete('/plataforma/:id',deletePlataforma);
module.exports = router;