const express = require('express');
const router = express.Router();
const { cadastrarCliente, buscarPerfil, atualizarPerfil } = require('../controllers/clienteController');

const autenticar = require('../middlewares/auth');

router.post('/clientes', cadastrarCliente);
router.get('/clientes/me', autenticar, buscarPerfil);
router.put('/clientes/me', autenticar, atualizarPerfil);

module.exports = router;