
const express = require('express');
const router = express.Router();

const entregaController = require('../controllers/entregaController');
const auth = require('../middlewares/auth');

// Cadastrar entrega
router.post('/entregas', auth, entregaController.cadastrar);

// Listar entregas do cliente
router.get('/entregas', auth, entregaController.listar);

// Buscar entrega de um pedido
router.get('/entregas/pedido/:id', auth, entregaController.buscarPorPedido);

module.exports = router;
