
const {
    cadastrarCategoria: criar,
    listarCategorias,
    buscarCategoriaPorId,
    atualizarCategoria,
    excluirCategoria
} = require('../services/categoriaService');

async function cadastrar(req, res) {
    try {
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({
                mensagem: 'O nome da categoria é obrigatório'
            });
        }

        const categoria = await criar({ nome });

        return res.status(201).json(categoria);

    } catch (erro) {
        return res.status(400).json({
            mensagem: 'Erro ao cadastrar categoria',
            erro: erro.message
        });
    }
}

async function listar(req, res) {
    try {
        const categorias = await listarCategorias();
        return res.status(200).json(categorias);

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao listar categorias',
            erro: erro.message
        });
    }
}

async function buscarPorId(req, res) {
    try {
        const categoria = await buscarCategoriaPorId(req.params.id);

        if (!categoria) {
            return res.status(404).json({
                mensagem: 'Categoria não encontrada'
            });
        }

        return res.status(200).json(categoria);

    } catch (erro) {
        return res.status(400).json({
            mensagem: 'Erro ao buscar categoria',
            erro: erro.message
        });
    }
}

async function atualizar(req, res) {
    try {
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({
                mensagem: 'O nome da categoria é obrigatório'
            });
        }

        const categoria = await atualizarCategoria(
            req.params.id,
            { nome }
        );

        if (!categoria) {
            return res.status(404).json({
                mensagem: 'Categoria não encontrada'
            });
        }

        return res.status(200).json(categoria);

    } catch (erro) {
        return res.status(400).json({
            mensagem: 'Erro ao atualizar categoria',
            erro: erro.message
        });
    }
}

async function excluir(req, res) {
    try {
        const categoria = await excluirCategoria(req.params.id);

        if (!categoria) {
            return res.status(404).json({
                mensagem: 'Categoria não encontrada'
            });
        }

        return res.status(200).json({
            mensagem: 'Categoria excluída com sucesso'
        });

    } catch (erro) {
        return res.status(400).json({
            mensagem: 'Não foi possível excluir a categoria. Verifique se existem produtos vinculados.',
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
