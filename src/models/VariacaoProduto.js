
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produto = require('./Produto');

const VariacaoProduto = sequelize.define('VariacaoProduto', {
    id_variacao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tamanho: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    cor: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    quant_estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Variacoes_produto',
    timestamps: false
});

Produto.hasMany(VariacaoProduto, {
    foreignKey: 'id_produto'
});

VariacaoProduto.belongsTo(Produto, {
    foreignKey: 'id_produto'
});

module.exports = VariacaoProduto;
