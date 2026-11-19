
const Carrinho = require('../models/Carrinho');
const ItemCarrinho = require('../models/ItemCarrinho');
const VariacaoProduto = require('../models/VariacaoProduto');
const Produto = require('../models/Produto');

async function buscarCarrinhoPorCliente(id_cliente) {
    return await Carrinho.findOne({
        where: { id_cliente },
        include: [{
            model: ItemCarrinho,
            include: [{
                model: VariacaoProduto,
                include: [Produto]
            }]
        }]
    });
}

async function criarCarrinho(id_cliente) {
    return await Carrinho.create({ id_cliente });
}

async function adicionarItem(id_carrinho, id_variacao, quantidade) {
    const variacao = await VariacaoProduto.findByPk(id_variacao);

    if (!variacao) {
        throw new Error('Variação não encontrada');
    }

    const itemExistente = await ItemCarrinho.findOne({
        where: { id_carrinho, id_variacao }
    });

    const quantidadeAtual = itemExistente
        ? itemExistente.quantidade
        : 0;

    const novaQuantidade = quantidadeAtual + quantidade;

    if (novaQuantidade > variacao.quant_estoque) {
        throw new Error('Quantidade solicitada maior que o estoque disponível');
    }

    if (itemExistente) {
        itemExistente.quantidade = novaQuantidade;
        await itemExistente.save();
        return itemExistente;
    }

    return await ItemCarrinho.create({
        id_carrinho,
        id_variacao,
        quantidade
    });
}

async function atualizarQuantidade(
    id_cliente,
    id_item_carrinho,
    quantidade
) {
    const carrinho = await Carrinho.findOne({
        where: { id_cliente }
    });

    if (!carrinho) return null;

    const item = await ItemCarrinho.findOne({
        where: {
            id_item_carrinho,
            id_carrinho: carrinho.id_carrinho
        }
    });

    if (!item) return null;

    const variacao = await VariacaoProduto.findByPk(item.id_variacao);

    if (!variacao || quantidade > variacao.quant_estoque) {
        throw new Error('Quantidade maior que o estoque disponível');
    }

    item.quantidade = quantidade;
    await item.save();

    return item;
}

async function removerItem(id_cliente, id_item_carrinho) {
    const carrinho = await Carrinho.findOne({
        where: { id_cliente }
    });

    if (!carrinho) return null;

    const item = await ItemCarrinho.findOne({
        where: {
            id_item_carrinho,
            id_carrinho: carrinho.id_carrinho
        }
    });

    if (!item) return null;

    await item.destroy();

    return item;
}

module.exports = {
    buscarCarrinhoPorCliente,
    criarCarrinho,
    adicionarItem,
    atualizarQuantidade,
    removerItem
};
