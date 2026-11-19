const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
    id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },

    senha: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },

    cep: {
        type: DataTypes.STRING(9),
        allowNull: true
    },
    endereco: {
        type: DataTypes.STRING(255),
        allowNull: true
    }

}, {
    tableName: 'Clientes',
    timestamps: false
});

module.exports = Cliente;