
const {
    cadastrarProduto,
    listarProdutos,
    buscarProdutoPorId,
    atualizarProduto,
    excluirProduto
} = require('../services/produtoService');

async function cadastrar(req, res) {
    try {
        const {
            nome,
            descricao,
            imagem,
            preco,
            id_categoria
        } = req.body;

        if (!nome || !descricao || !imagem ||
            preco === undefined || !id_categoria) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos do produto'
            });
        }

        if (Number(preco) <= 0 || !Number.isFinite(Number(preco))) {
            return res.status(400).json({
                mensagem: 'O preço deve ser um número maior que zero'
            });
        }

        const produto = await cadastrarProduto({
            nome,
            descricao,
            imagem,
            preco,
            id_categoria
        });

        return res.status(201).json(produto);

    } catch (erro) {
        return res.status(400).json({
            mensagem: 'Erro ao cadastrar produto',
            erro: erro.message
        });
    }
}

async function listar(req, res) {
    try {
        const produtos = await listarProdutos();
        return res.status(200).json(produtos);

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao listar produtos',
            erro: erro.message
        });
    }
}

async function buscarPorId(req, res) {
    try {
        const produto = await buscarProdutoPorId(req.params.id);

        if (!produto) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado'
            });
        }

        return res.status(200).json(produto);

    } catch (erro) {
        return res.status(400).json({
            mensagem: 'Erro ao buscar produto',
            erro: erro.message
        });
    }
}

async function atualizar(req, res) {
    try {
        const {
            nome,
            descricao,
            imagem,
            preco,
            id_categoria
        } = req.body;

        if (!nome || !descricao || !imagem ||
            preco === undefined || !id_categoria) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos do produto'
            });
        }

        if (Number(preco) <= 0 || !Number.isFinite(Number(preco))) {
            return res.status(400).json({
                mensagem: 'O preço deve ser um número maior que zero'
            });
        }

        const produto = await atualizarProduto(req.params.id, {
            nome,
            descricao,
            imagem,
            preco,
            id_categoria
        });

        if (!produto) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado'
            });
        }

        return res.status(200).json(produto);

    } catch (erro) {
        return res.status(400).json({
            mensagem: 'Erro ao atualizar produto',
            erro: erro.message
        });
    }
}

async function excluir(req, res) {
    try {
        const produto = await excluirProduto(req.params.id);

        if (!produto) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado'
            });
        }

        return res.status(200).json({
            mensagem: 'Produto excluído com sucesso'
        });

    } catch (erro) {
        return res.status(400).json({
            mensagem: 'Não foi possível excluir o produto',
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
