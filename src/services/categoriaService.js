
const Categoria = require('../models/Categoria');

async function cadastrarCategoria(dados) {
    return await Categoria.create(dados);
}

async function listarCategorias() {
    return await Categoria.findAll();
}

async function buscarCategoriaPorId(id) {
    return await Categoria.findByPk(id);
}

async function atualizarCategoria(id, dados) {
    const categoria = await buscarCategoriaPorId(id);

    if (!categoria) {
        return null;
    }

    await categoria.update(dados);
    return categoria;
}

async function excluirCategoria(id) {
    const categoria = await buscarCategoriaPorId(id);

    if (!categoria) {
        return null;
    }

    await categoria.destroy();
    return categoria;
}

module.exports = {
    cadastrarCategoria,
    listarCategorias,
    buscarCategoriaPorId,
    atualizarCategoria,
    excluirCategoria
};
