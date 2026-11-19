
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pedido = require('./Pedido');
const VariacaoProduto = require('./VariacaoProduto');

const ItemPedido = sequelize.define('ItemPedido', {
    id_item_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pedido,
            key: 'id_pedido'
        }
    },
    id_variacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: VariacaoProduto,
            key: 'id_variacao'
        }
    }
}, {
    tableName: 'Itens_pedido',
    timestamps: false
});

Pedido.hasMany(ItemPedido, {
    foreignKey: 'id_pedido'
});

ItemPedido.belongsTo(Pedido, {
    foreignKey: 'id_pedido'
});

VariacaoProduto.hasMany(ItemPedido, {
    foreignKey: 'id_variacao'
});

ItemPedido.belongsTo(VariacaoProduto, {
    foreignKey: 'id_variacao'
});

module.exports = ItemPedido;
