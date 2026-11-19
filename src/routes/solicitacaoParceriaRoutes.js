
const express = require('express');
const router = express.Router();

const solicitacaoParceriaController = require('../controllers/solicitacaoParceriaController');

// Enviar solicitação de parceria
router.post(
    '/solicitacoes-parceria',
    solicitacaoParceriaController.cadastrar
);

module.exports = router;
