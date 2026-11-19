
const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');

async function cadastrarProduto(dados) {
    return await Produto.create(dados);
}

async function listarProdutos() {
    return await Produto.findAll({
        include: [{
            model: Categoria
        }]
    });
}

async function buscarProdutoPorId(id) {
    return await Produto.findByPk(id, {
        include: [{
            model: Categoria
        }]
    });
}

async function atualizarProduto(id, dados) {
    const produto = await Produto.findByPk(id);

    if (!produto) {
        return null;
    }

    await produto.update(dados);
    return produto;
}

async function excluirProduto(id) {
    const produto = await Produto.findByPk(id);

    if (!produto) {
        return null;
    }

    await produto.destroy();
    return produto;
}

module.exports = {
    cadastrarProduto,
    listarProdutos,
    buscarProdutoPorId,
    atualizarProduto,
    excluirProduto
};
