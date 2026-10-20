const express = require('express');
const router = express.Router();
const {cadastrar} = require('../controllers/clienteController');

router.post('/usuarios', cadastrar);

module.exports = router;