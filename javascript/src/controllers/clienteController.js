const bcrypt = require('bcrypt');
const Cliente = require('../models/Cliente');

async function cadastrar(req, res) {
    try {
        const { nome, email, senha, cpf, num_de_tel, cep, endereco } = req.body;

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const cliente = await Cliente.create({
            nome,
            email,
            senha: senhaCriptografada,
            cpf,
            num_de_tel,
            cep,
            endereco,
        });

        res.status(201).json({
            id: cliente.id_cliente,
            nome: cliente.nome,
            email: cliente.email,
            cpf: cliente.cpf,
            num_de_tel: cliente.num_de_tel,
            cep: cliente.cep,
            endereco: cliente.endereco,
        });
        
    } catch (error) {
        res.status(400).json({
            mensagem: 'Erro ao cadastrar cliente',
            erro: error.message,
        });
    }
}

module.exports = {cadastrar};