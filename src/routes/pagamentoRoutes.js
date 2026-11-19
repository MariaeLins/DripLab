
const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');
const auth = require('../middlewares/auth');

router.post('/pagamentos', auth, pagamentoController.cadastrar);
router.get('/pagamentos/pedido/:id', auth, pagamentoController.buscarPorPedido);

module.exports = router;
