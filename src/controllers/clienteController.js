const bcrypt = require('bcrypt');

const {
    cadastrarCliente: criar,
    buscarClientePorEmail
} = require('../services/clienteService');

async function cadastrarCliente(req, res) {
    try {
        const { nome, email, senha, telefone, cep, endereco } = req.body;

        if (!nome || !email || !senha || !telefone) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos obrigatórios'
            });
        }

        const emailExistente = await buscarClientePorEmail(
            email.trim().toLowerCase()
        );

        if (emailExistente) {
            return res.status(409).json({
                mensagem: 'Este e-mail já está cadastrado.'
            });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const cliente = await criar({
            nome: nome.trim(),
            email: email.trim().toLowerCase(),
            senha: senhaCriptografada,
            telefone,
            cep: null,
            endereco: null
        });

        return res.status(201).json({
            mensagem: 'Cadastro de Cliente efetuado com sucesso!',
            cliente: {
                id_cliente: cliente.id_cliente,
                nome: cliente.nome,
                email: cliente.email,
                telefone: cliente.telefone,
                cep: cliente.cep,
                endereco: cliente.endereco
            }
        });

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao cadastrar cliente.',
            erro: erro.message
        });
    }
}

const {
    buscarClientePorId,
    atualizarCliente
} = require('../services/clienteService');

async function buscarPerfil(req, res) {
    try {
        const cliente = await buscarClientePorId(
            req.cliente.id_cliente
        );

        if (!cliente) {
            return res.status(404).json({
                mensagem: 'Cliente não encontrado.'
            });
        }

        return res.json({
            id_cliente: cliente.id_cliente,
            nome: cliente.nome,
            email: cliente.email,
            telefone: cliente.telefone,
            cep: cliente.cep,
            endereco: cliente.endereco
        });

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao buscar perfil.'
        });
    }
}

async function atualizarPerfil(req, res) {
    try {
        const { nome, email, senha, telefone } = req.body;

        const dados = {};

        if (nome !== undefined) dados.nome = nome;
        if (email !== undefined) dados.email = email.trim().toLowerCase();
        if (telefone !== undefined) dados.telefone = telefone;
        if (cep !== undefined) dados.cep = cep;
        if (endereco !== undefined) dados.endereco = endereco;

        if (Object.keys(dados).length === 0) {
            return res.status(400).json({
                mensagem: 'Nenhuma informação foi enviada.'
            });
        }

        const cliente = await atualizarCliente(
            req.cliente.id_cliente,
            dados
        );

        if (!cliente) {
            return res.status(404).json({
                mensagem: 'Cliente não encontrado.'
            });
        }

        return res.json({
            mensagem: 'Perfil atualizado com sucesso!',
            cliente: {
                id_cliente: cliente.id_cliente,
                nome: cliente.nome,
                email: cliente.email,
                telefone: cliente.telefone,
                cep: cliente.cep,
                endereco: cliente.endereco
            }
        });

    } catch (erro) {
        return res.status(400).json({
            mensagem: 'Erro ao atualizar perfil.',
            erro: erro.message
        });
    }
}

module.exports = { cadastrarCliente, buscarPerfil, atualizarPerfil
};