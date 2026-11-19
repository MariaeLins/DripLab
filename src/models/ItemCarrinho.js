
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Carrinho = require('./Carrinho');
const VariacaoProduto = require('./VariacaoProduto');

const ItemCarrinho = sequelize.define('ItemCarrinho', {
    id_item_carrinho: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_carrinho: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Carrinho,
            key: 'id_carrinho'
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
    tableName: 'Itens_carrinho',
    timestamps: false
});

Carrinho.hasMany(ItemCarrinho, {
    foreignKey: 'id_carrinho'
});

ItemCarrinho.belongsTo(Carrinho, {
    foreignKey: 'id_carrinho'
});

VariacaoProduto.hasMany(ItemCarrinho, {
    foreignKey: 'id_variacao'
});

ItemCarrinho.belongsTo(VariacaoProduto, {
    foreignKey: 'id_variacao'
});

module.exports = ItemCarrinho;
