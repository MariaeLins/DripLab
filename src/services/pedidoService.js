
const sequelize = require('../config/database');

const Pedido = require('../models/Pedido');
const ItemPedido = require('../models/ItemPedido');
const Carrinho = require('../models/Carrinho');
const ItemCarrinho = require('../models/ItemCarrinho');
const VariacaoProduto = require('../models/VariacaoProduto');
const Produto = require('../models/Produto');

async function finalizarPedido(id_cliente) {
    const transacao = await sequelize.transaction();

    try {
        // Buscar o carrinho do cliente
        const carrinho = await Carrinho.findOne({
            where: { id_cliente },
            transaction: transacao,
            lock: transacao.LOCK.UPDATE
        });

        if (!carrinho) {
            throw new Error('Carrinho não encontrado');
        }

        // Buscar os itens separadamente
        const itensCarrinho = await ItemCarrinho.findAll({
            where: {
                id_carrinho: carrinho.id_carrinho
            },
            transaction: transacao
        });

        if (itensCarrinho.length === 0) {
            throw new Error('O carrinho está vazio');
        }

        let valor_total = 0;
        const itensPedido = [];

        // Conferir cada item
        for (const item of itensCarrinho) {
            const variacao = await VariacaoProduto.findByPk(
                item.id_variacao,
                {
                    transaction: transacao,
                    lock: transacao.LOCK.UPDATE
                }
            );

            if (!variacao) {
                throw new Error(
                    `Variação ${item.id_variacao} não encontrada`
                );
            }

            if (item.quantidade <= 0) {
                throw new Error('Quantidade inválida no carrinho');
            }

            if (item.quantidade > variacao.quant_estoque) {
                throw new Error(
                    `Estoque insuficiente para a variação ${variacao.id_variacao}`
                );
            }

            // Buscar o produto diretamente pelo ID
            const produto = await Produto.findByPk(
                variacao.id_produto,
                { transaction: transacao }
            );

            if (!produto) {
                throw new Error(
                    `Produto não encontrado para a variação ${variacao.id_variacao}`
                );
            }

            const preco = Number(produto.preco);

            if (!Number.isFinite(preco) || preco <= 0) {
                throw new Error('Preço do produto inválido');
            }

            valor_total += preco * item.quantidade;

            itensPedido.push({
                quantidade: item.quantidade,
                preco_unitario: preco,
                id_variacao: item.id_variacao
            });

            // Atualizar estoque
            variacao.quant_estoque -= item.quantidade;

            await variacao.save({
                transaction: transacao
            });
        }

        // Criar pedido
        const pedido = await Pedido.create({
            id_cliente,
            valor_total: Number(valor_total.toFixed(2)),
            status: 'Pendente'
        }, {
            transaction: transacao
        });

        // Criar itens do pedido
        for (const item of itensPedido) {
            await ItemPedido.create({
                ...item,
                id_pedido: pedido.id_pedido
            }, {
                transaction: transacao
            });
        }

        // Esvaziar carrinho
        await ItemCarrinho.destroy({
            where: {
                id_carrinho: carrinho.id_carrinho
            },
            transaction: transacao
        });

        await transacao.commit();

        return pedido;

    } catch (erro) {
        await transacao.rollback();
        throw erro;
    }
}

// Listar pedidos de um cliente
async function listarPedidosPorCliente(id_cliente) {
    return await Pedido.findAll({
        where: { id_cliente },
        include: [{
            model: ItemPedido,
            include: [{
                model: VariacaoProduto,
                include: [Produto]
            }]
        }],
        order: [['data_pedido', 'DESC']]
    });
}

// Buscar um pedido específico de um cliente
async function buscarPedidoPorId(id_pedido, id_cliente) {
    return await Pedido.findOne({
        where: {
            id_pedido,
            id_cliente
        },
        include: [{
            model: ItemPedido,
            include: [{
                model: VariacaoProduto,
                include: [Produto]
            }]
        }]
    });
}

module.exports = {
    finalizarPedido,
    listarPedidosPorCliente,
    buscarPedidoPorId
};
