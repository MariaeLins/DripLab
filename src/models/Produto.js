
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./Categoria');

const Produto = sequelize.define('Produto', {
    id_produto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Produtos',
    timestamps: false
});

Categoria.hasMany(Produto, {
    foreignKey: 'id_categoria'
});

Produto.belongsTo(Categoria, {
    foreignKey: 'id_categoria'
});

module.exports = Produto;
