
const {
    cadastrarVariacao,
    listarVariacoes,
    buscarVariacaoPorId,
    atualizarVariacao,
    excluirVariacao
} = require('../services/variacaoProdutoService');

async function cadastrar(req, res) {
    try {
        const {
            tamanho,
            cor,
            quant_estoque,
            id_produto
        } = req.body;

        if (!tamanho || !cor || quant_estoque === undefined ||
            !id_produto) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos da variação'
            });
        }

        if (!Number.isInteger(Number(quant_estoque)) ||
            Number(quant_estoque) < 0) {
            return res.status(400).json({
                mensagem: 'O estoque deve ser um número inteiro igual ou maior que zero'
            });
        }

        const variacao = await cadastrarVariacao({
            tamanho,
            cor,
            quant_estoque,
            id_produto
        });

        return res.status(201).json(variacao);

    } catch (erro) {
        return res.status(400).json({
            mensagem: 'Erro ao cadastrar variação',
            erro: erro.message
        });
    }
}

async function listar(req, res) {
    try {
        const variacoes = await listarVariacoes();
        return res.status(200).json(variacoes);

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao listar variações',
            erro: erro.message
        });
    }
}

async function buscarPorId(req, res) {
    try {
        const variacao = await buscarVariacaoPorId(req.params.id);

        if (!variacao) {
            return res.status(404).json({
                mensagem: 'Variação não encontrada'
            });
        }

        return res.status(200).json(variacao);

    } catch (erro) {
        return res.status(400).json({
            mensagem: 'Erro ao buscar variação',
            erro: erro.message
        });
    }
}

async function atualizar(req, res) {
    try {
        const {
            tamanho,
            cor,
            quant_estoque,
            id_produto
        } = req.body;

        if (!tamanho || !cor || quant_estoque === undefined ||
            !id_produto) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos da variação'
            });
        }

        if (!Number.isInteger(Number(quant_estoque)) ||
            Number(quant_estoque) < 0) {
            return res.status(400).json({
                mensagem: 'O estoque deve ser um número inteiro igual ou maior que zero'
            });
        }

        const variacao = await atualizarVariacao(req.params.id, {
            tamanho,
            cor,
            quant_estoque,
            id_produto
        });

        if (!variacao) {
            return res.status(404).json({
                mensagem: 'Variação não encontrada'
            });
        }

        return res.status(200).json(variacao);

    } catch (erro) {
        return res.status(400).json({
            mensagem: 'Erro ao atualizar variação',
            erro: erro.message
        });
    }
}

async function excluir(req, res) {
    try {
        const variacao = await excluirVariacao(req.params.id);

        if (!variacao) {
            return res.status(404).json({
                mensagem: 'Variação não encontrada'
            });
        }

        return res.status(200).json({
            mensagem: 'Variação excluída com sucesso'
        });

    } catch (erro) {
        return res.status(400).json({
            mensagem: 'Erro ao excluir variação',
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
