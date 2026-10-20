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
    tamanho_roupa: {
        type: DataTypes.ENUM('PP', 'P', 'M', 'G', 'GG'),
        allowNull: false,
    },
    tamanho_calcado: {
        type: DataTypes.ENUM('33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'),
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