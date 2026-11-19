
const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');
const auth = require('../middlewares/auth');

router.get('/carrinho', auth, carrinhoController.buscar);
router.post('/carrinho/itens', auth, carrinhoController.adicionar);
router.put('/carrinho/itens/:id', auth, carrinhoController.atualizar);
router.delete('/carrinho/itens/:id', auth, carrinhoController.remover);

module.exports = router;
