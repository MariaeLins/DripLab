
const express = require('express');
const router = express.Router();

const pedidoController = require('../controllers/pedidoController');
const auth = require('../middlewares/auth');

// Finalizar compra
router.post('/pedidos/finalizar', auth, pedidoController.finalizar);

// Listar pedidos do cliente
router.get('/pedidos', auth, pedidoController.listar);

// Buscar pedido específico
router.get('/pedidos/:id', auth, pedidoController.buscarPorId);

module.exports = router;
