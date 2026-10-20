const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Cliente');

async function login(req, res) {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ where: { email } });
        
        if (!usuario) {
            return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
        }

        const token = jwt.sign(
            { id: usuario.id_cliente }, 
            process.env.JWT_SECRET, 
            { expiresIn: '8h' }
        );

        res.json({token});
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao fazer login', 
        erro: error.message 
        });
    }
}

module.exports = {login};