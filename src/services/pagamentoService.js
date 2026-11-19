
const Pagamento = require('../models/Pagamento');
const Pedido = require('../models/Pedido');

// Cadastrar pagamento
async function cadastrarPagamento(dados) {
    return await Pagamento.create(dados);
}

// Buscar pagamento pelo pedido
async function buscarPagamentoPorPedido(id_pedido) {
    return await Pagamento.findOne({
        where: { id_pedido },
        include: [Pedido]
    });
}

// Atualizar status do pagamento
async function atualizarStatusPagamento(id_pagamento, status) {
    const pagamento = await Pagamento.findByPk(id_pagamento);

    if (!pagamento) {
        return null;
    }

    pagamento.status = status;

    if (status === 'Pago') {
        pagamento.data_pagamento = new Date();
    }

    await pagamento.save();

    return pagamento;
}

module.exports = {
    cadastrarPagamento,
    buscarPagamentoPorPedido,
    atualizarStatusPagamento
};
