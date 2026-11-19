
const {
    finalizarPedido,
    listarPedidosPorCliente,
    buscarPedidoPorId
} = require('../services/pedidoService');

// Finalizar compra
async function finalizar(req, res) {
    try {
        const id_cliente = req.cliente.id_cliente;

        const pedido = await finalizarPedido(id_cliente);

        return res.status(201).json({
            mensagem: 'Pedido realizado com sucesso!',
            pedido
        });

    } catch (erro) {
        return res.status(400).json({
            mensagem: 'Não foi possível finalizar o pedido',
            erro: erro.message
        });
    }
}

// Listar pedidos do cliente
async function listar(req, res) {
    try {
        const id_cliente = req.cliente.id_cliente;

        const pedidos = await listarPedidosPorCliente(id_cliente);

        return res.status(200).json(pedidos);

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao listar pedidos',
            erro: erro.message
        });
    }
}

// Buscar um pedido específico
async function buscarPorId(req, res) {
    try {
        const id_cliente = req.cliente.id_cliente;
        const id_pedido = req.params.id;

        const pedido = await buscarPedidoPorId(
            id_pedido,
            id_cliente
        );

        if (!pedido) {
            return res.status(404).json({
                mensagem: 'Pedido não encontrado'
            });
        }

        return res.status(200).json(pedido);

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao buscar pedido',
            erro: erro.message
        });
    }
}

module.exports = {
    finalizar,
    listar,
    buscarPorId
};
