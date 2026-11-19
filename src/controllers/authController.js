const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
    buscarClientePorEmail
} = require('../services/clienteService');

async function loginCliente(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: 'Informe o e-mail e a senha.'
            });
        }

        const cliente = await buscarClientePorEmail(
            email.trim().toLowerCase()
        );

        if (!cliente) {
            return res.status(401).json({
                mensagem: 'E-mail ou senha inválidos.'
            });
        }

        const senhaConfere = await bcrypt.compare(
            senha,
            cliente.senha
        );

        if (!senhaConfere) {
            return res.status(401).json({
                mensagem: 'E-mail ou senha inválidos.'
            });
        }

        const token = jwt.sign(
            { id_cliente: cliente.id_cliente },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        return res.json({
            mensagem: 'Login realizado com sucesso!',
            token,
            cliente: {
                id_cliente: cliente.id_cliente,
                nome: cliente.nome,
                email: cliente.email
            }
        });

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao realizar login.',
            erro: erro.message
        });
    }
}

module.exports = { loginCliente };