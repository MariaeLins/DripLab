
const VariacaoProduto = require('../models/VariacaoProduto');
const Produto = require('../models/Produto');

async function cadastrarVariacao(dados) {
    return await VariacaoProduto.create(dados);
}

async function listarVariacoes() {
    return await VariacaoProduto.findAll({
        include: [{
            model: Produto
        }]
    });
}

async function buscarVariacaoPorId(id) {
    return await VariacaoProduto.findByPk(id, {
        include: [{
            model: Produto
        }]
    });
}

async function atualizarVariacao(id, dados) {
    const variacao = await VariacaoProduto.findByPk(id);

    if (!variacao) {
        return null;
    }

    await variacao.update(dados);
    return variacao;
}

async function excluirVariacao(id) {
    const variacao = await VariacaoProduto.findByPk(id);

    if (!variacao) {
        return null;
    }

    await variacao.destroy();
    return variacao;
}

module.exports = {
    cadastrarVariacao,
    listarVariacoes,
    buscarVariacaoPorId,
    atualizarVariacao,
    excluirVariacao
};
