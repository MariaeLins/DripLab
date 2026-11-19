
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');

const Carrinho = sequelize.define('Carrinho', {
    id_carrinho: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cliente,
            key: 'id_cliente'
        },
        unique: true
    }
}, {
    tableName: 'Carrinhos',
    timestamps: false
});

Cliente.hasOne(Carrinho, {
    foreignKey: 'id_cliente'
});

Carrinho.belongsTo(Cliente, {
    foreignKey: 'id_cliente'
});

module.exports = Carrinho;
