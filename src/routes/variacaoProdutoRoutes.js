
const express = require('express');
const router = express.Router();

const variacaoController = require('../controllers/variacaoProdutoController');

router.post('/variacoes', variacaoController.cadastrar);
router.get('/variacoes', variacaoController.listar);
router.get('/variacoes/:id', variacaoController.buscarPorId);
router.put('/variacoes/:id', variacaoController.atualizar);
router.delete('/variacoes/:id', variacaoController.excluir);

module.exports = router;
