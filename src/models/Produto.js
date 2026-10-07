const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
    id_produto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quant_estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tamanho: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Produto;