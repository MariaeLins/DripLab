
const {
    cadastrarSolicitacao,
    listarSolicitacoes,
    buscarSolicitacaoPorId,
    atualizarStatus,
    excluirSolicitacao
} = require('../services/solicitacaoParceriaService');

// Cadastrar solicitação
async function cadastrar(req, res) {
    try {
        const { nome, email, telefone, mensagem } = req.body;

        if (!nome || !email || !telefone || !mensagem) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos obrigatórios'
            });
        }

        const solicitacao = await cadastrarSolicitacao({
            nome,
            email,
            telefone,
            mensagem
        });

        return res.status(201).json({
            mensagem: 'Solicitação de parceria enviada com sucesso!',
            solicitacao
        });

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao cadastrar solicitação',
            erro: erro.message
        });
    }
}

// Listar solicitações
async function listar(req, res) {
    try {
        const solicitacoes = await listarSolicitacoes();

        return res.status(200).json(solicitacoes);

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao listar solicitações',
            erro: erro.message
        });
    }
}

// Buscar solicitação por ID
async function buscarPorId(req, res) {
    try {
        const solicitacao = await buscarSolicitacaoPorId(req.params.id);

        if (!solicitacao) {
            return res.status(404).json({
                mensagem: 'Solicitação não encontrada'
            });
        }

        return res.status(200).json(solicitacao);

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao buscar solicitação',
            erro: erro.message
        });
    }
}

// Atualizar status
async function atualizar(req, res) {
    try {
        const { status } = req.body;

        const statusPermitidos = [
            'Pendente',
            'Em análise',
            'Aprovada',
            'Recusada'
        ];

        if (!statusPermitidos.includes(status)) {
            return res.status(400).json({
                mensagem: 'Status inválido'
            });
        }

        const solicitacao = await atualizarStatus(
            req.params.id,
            status
        );

        if (!solicitacao) {
            return res.status(404).json({
                mensagem: 'Solicitação não encontrada'
            });
        }

        return res.status(200).json({
            mensagem: 'Status atualizado com sucesso',
            solicitacao
        });

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao atualizar solicitação',
            erro: erro.message
        });
    }
}

// Excluir solicitação
async function excluir(req, res) {
    try {
        const solicitacao = await excluirSolicitacao(req.params.id);

        if (!solicitacao) {
            return res.status(404).json({
                mensagem: 'Solicitação não encontrada'
            });
        }

        return res.status(200).json({
            mensagem: 'Solicitação excluída com sucesso'
        });

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao excluir solicitação',
            erro: erro.message
        });
    }
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    excluir
};
