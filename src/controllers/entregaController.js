
const {
    cadastrarEntrega,
    buscarEntregaPorPedido,
    listarEntregas,
    atualizarEntrega
} = require('../services/entregaService');

const Pedido = require('../models/Pedido');

// Cadastrar entrega
async function cadastrar(req, res) {
    try {
        const { id_pedido, endereco_entrega, cep } = req.body;
        const id_cliente = req.cliente.id_cliente;

        if (!id_pedido || !endereco_entrega || !cep) {
            return res.status(400).json({
                mensagem: 'Informe o pedido, endereço e CEP'
            });
        }

        const pedido = await Pedido.findOne({
            where: { id_pedido, id_cliente }
        });

        if (!pedido) {
            return res.status(404).json({
                mensagem: 'Pedido não encontrado'
            });
        }

        const entregaExistente = await buscarEntregaPorPedido(id_pedido);

        if (entregaExistente) {
            return res.status(409).json({
                mensagem: 'Este pedido já possui uma entrega cadastrada'
            });
        }

        const entrega = await cadastrarEntrega({
            id_pedido,
            endereco_entrega,
            cep,
            status: 'Aguardando envio'
        });

        return res.status(201).json({
            mensagem: 'Entrega cadastrada com sucesso',
            entrega
        });

    } catch (erro) {
        return res.status(400).json({
            mensagem: 'Erro ao cadastrar entrega',
            erro: erro.message
        });
    }
}

// Buscar entrega do pedido do cliente
async function buscarPorPedido(req, res) {
    try {
        const id_cliente = req.cliente.id_cliente;
        const id_pedido = req.params.id;

        const pedido = await Pedido.findOne({
            where: { id_pedido, id_cliente }
        });

        if (!pedido) {
            return res.status(404).json({
                mensagem: 'Pedido não encontrado'
            });
        }

        const entrega = await buscarEntregaPorPedido(id_pedido);

        if (!entrega) {
            return res.status(404).json({
                mensagem: 'Entrega não encontrada'
            });
        }

        return res.status(200).json(entrega);

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao buscar entrega',
            erro: erro.message
        });
    }
}

// Listar entregas do cliente
async function listar(req, res) {
    try {
        const id_cliente = req.cliente.id_cliente;

        const entregas = await listarEntregas(id_cliente);

        return res.status(200).json(entregas);

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao listar entregas',
            erro: erro.message
        });
    }
}

module.exports = {
    cadastrar,
    buscarPorPedido,
    listar
};
