
const {
    cadastrarPagamento,
    buscarPagamentoPorPedido,
    atualizarStatusPagamento
} = require('../services/pagamentoService');

const Pedido = require('../models/Pedido');

// Cadastrar pagamento
async function cadastrar(req, res) {
    try {
        const { forma_pagamento, id_pedido } = req.body;
        const id_cliente = req.cliente.id_cliente;

        if (!forma_pagamento || !id_pedido) {
            return res.status(400).json({
                mensagem: 'Informe a forma de pagamento e o pedido'
            });
        }

        const pedido = await Pedido.findOne({
            where: {
                id_pedido,
                id_cliente
            }
        });

        if (!pedido) {
            return res.status(404).json({
                mensagem: 'Pedido não encontrado'
            });
        }

        const pagamentoExistente = await buscarPagamentoPorPedido(id_pedido);

        if (pagamentoExistente) {
            return res.status(409).json({
                mensagem: 'Este pedido já possui um pagamento registrado'
            });
        }

        const pagamento = await cadastrarPagamento({
            forma_pagamento,
            valor: pedido.valor_total,
            id_pedido,
            status: 'Pendente'
        });

        return res.status(201).json({
            mensagem: 'Pagamento registrado com sucesso',
            pagamento
        });

    } catch (erro) {
        return res.status(400).json({
            mensagem: 'Erro ao registrar pagamento',
            erro: erro.message
        });
    }
}

// Consultar pagamento de um pedido
async function buscarPorPedido(req, res) {
    try {
        const id_cliente = req.cliente.id_cliente;
        const id_pedido = req.params.id;

        const pedido = await Pedido.findOne({
            where: {
                id_pedido,
                id_cliente
            }
        });

        if (!pedido) {
            return res.status(404).json({
                mensagem: 'Pedido não encontrado'
            });
        }

        const pagamento = await buscarPagamentoPorPedido(id_pedido);

        if (!pagamento) {
            return res.status(404).json({
                mensagem: 'Pagamento não encontrado'
            });
        }

        return res.status(200).json(pagamento);

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao buscar pagamento',
            erro: erro.message
        });
    }
}

module.exports = {
    cadastrar,
    buscarPorPedido
};
