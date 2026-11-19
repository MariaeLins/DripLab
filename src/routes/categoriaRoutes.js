
const express = require('express');
const router = express.Router();

const categoriaController = require('../controllers/categoriaController');

router.post('/categorias', categoriaController.cadastrar);
router.get('/categorias', categoriaController.listar);
router.get('/categorias/:id', categoriaController.buscarPorId);
router.put('/categorias/:id', categoriaController.atualizar);
router.delete('/categorias/:id', categoriaController.excluir);

module.exports = router;
