const express = require('express');
const router = express.Router();
const { loginCliente } = require('../controllers/authController');

router.post('/login', loginCliente);

module.exports = router;