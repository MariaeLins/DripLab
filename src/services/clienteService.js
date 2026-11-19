const Cliente = require('../models/Cliente');

async function cadastrarCliente(dados) {
    return await Cliente.create(dados);
}

async function buscarClientePorEmail(email) {
    return await Cliente.findOne({
        where: { email }
    });
}

async function buscarClientePorId(id) {
    return await Cliente.findByPk(id);
}

async function atualizarCliente(id, dados) {
    const cliente = await buscarClientePorId(id);

    if (!cliente) {
        return null;
    }

    await cliente.update(dados);

    return cliente;
}

module.exports = { cadastrarCliente, buscarClientePorEmail, buscarClientePorId, atualizarCliente };