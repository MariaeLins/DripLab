
const {
    buscarCarrinhoPorCliente,
    criarCarrinho,
    adicionarItem,
    atualizarQuantidade,
    removerItem
} = require('../services/carrinhoService');

const VariacaoProduto = require('../models/VariacaoProduto');

// Buscar carrinho do cliente logado
async function buscar(req, res) {
    try {
        const id_cliente = req.cliente.id_cliente;

        let carrinho = await buscarCarrinhoPorCliente(id_cliente);

        if (!carrinho) {
            carrinho = await criarCarrinho(id_cliente);
        }

        return res.status(200).json(carrinho);

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao buscar carrinho',
            erro: erro.message
        });
    }
}

// Adicionar item ao carrinho
async function adicionar(req, res) {
    try {
        const id_cliente = req.cliente.id_cliente;
        const { id_variacao, quantidade } = req.body;

        if (!id_variacao || quantidade === undefined) {
            return res.status(400).json({
                mensagem: 'Informe a variação e a quantidade'
            });
        }

        if (!Number.isInteger(Number(quantidade)) ||
            Number(quantidade) <= 0) {
            return res.status(400).json({
                mensagem: 'A quantidade deve ser um número inteiro maior que zero'
            });
        }

        const carrinho = await buscarCarrinhoPorCliente(id_cliente)
            || await criarCarrinho(id_cliente);

        const variacao = await VariacaoProduto.findByPk(id_variacao);

        if (!variacao) {
            return res.status(404).json({
                mensagem: 'Variação não encontrada'
            });
        }

        const item = await adicionarItem(
            carrinho.id_carrinho,
            id_variacao,
            Number(quantidade)
        );

        return res.status(201).json(item);

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao adicionar item ao carrinho',
            erro: erro.message
        });
    }
}

// Atualizar quantidade
async function atualizar(req, res) {
    try {
        const { quantidade } = req.body;

        if (!Number.isInteger(Number(quantidade)) ||
            Number(quantidade) <= 0) {
            return res.status(400).json({
                mensagem: 'Informe uma quantidade inteira maior que zero'
            });
        }

        const item = await atualizarQuantidade(
            req.cliente.id_cliente,
            req.params.id,
            Number(quantidade)
        );

        if (!item) {
            return res.status(404).json({
                mensagem: 'Item não encontrado'
            });
        }

        return res.status(200).json(item);

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao atualizar item',
            erro: erro.message
        });
    }
}

// Remover item
async function remover(req, res) {
    try {
        const item = await removerItem(
            req.cliente.id_cliente,
            req.params.id
        );

        if (!item) {
            return res.status(404).json({
                mensagem: 'Item não encontrado'
            });
        }

        return res.status(200).json({
            mensagem: 'Item removido do carrinho'
        });

    } catch (erro) {
        return res.status(500).json({
            mensagem: 'Erro ao remover item',
            erro: erro.message
        });
    }
}

module.exports = {
    buscar,
    adicionar,
    atualizar,
    remover
};
