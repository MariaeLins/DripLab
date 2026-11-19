
const Entrega = require('../models/Entrega');
const Pedido = require('../models/Pedido');

// Cadastrar entrega
async function cadastrarEntrega(dados) {
    return await Entrega.create(dados);
}

// Buscar entrega pelo pedido
async function buscarEntregaPorPedido(id_pedido) {
    return await Entrega.findOne({
        where: { id_pedido },
        include: [Pedido]
    });
}

// Listar entregas
async function listarEntregas(id_cliente) {
    return await Entrega.findAll({
        include: [{
            model: Pedido,
            where: { id_cliente },
            required: true
        }]
    });
}

// Atualizar informações da entrega
async function atualizarEntrega(id_entrega, dados) {
    const entrega = await Entrega.findByPk(id_entrega);

    if (!entrega) {
        return null;
    }

    await entrega.update(dados);

    return entrega;
}

module.exports = {
    cadastrarEntrega,
    buscarEntregaPorPedido,
    listarEntregas,
    atualizarEntrega
};
