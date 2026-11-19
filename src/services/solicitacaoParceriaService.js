
const SolicitacaoParceria = require('../models/SolicitacaoParceria');

// Cadastrar solicitação
async function cadastrarSolicitacao(dados) {
    return await SolicitacaoParceria.create(dados);
}

// Listar solicitações
async function listarSolicitacoes() {
    return await SolicitacaoParceria.findAll({
        order: [['data_solicitacao', 'DESC']]
    });
}

// Buscar solicitação por ID
async function buscarSolicitacaoPorId(id_solicitacao) {
    return await SolicitacaoParceria.findByPk(id_solicitacao);
}

// Atualizar status da solicitação
async function atualizarStatus(id_solicitacao, status) {
    const solicitacao = await buscarSolicitacaoPorId(id_solicitacao);

    if (!solicitacao) {
        return null;
    }

    await solicitacao.update({ status });

    return solicitacao;
}

// Excluir solicitação
async function excluirSolicitacao(id_solicitacao) {
    const solicitacao = await buscarSolicitacaoPorId(id_solicitacao);

    if (!solicitacao) {
        return null;
    }

    await solicitacao.destroy();

    return solicitacao;
}

module.exports = {
    cadastrarSolicitacao,
    listarSolicitacoes,
    buscarSolicitacaoPorId,
    atualizarStatus,
    excluirSolicitacao
};
