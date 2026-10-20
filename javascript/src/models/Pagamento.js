const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Pagamento = sequelize.define('Pagamento', {
    id_pagamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    metodo_pagamento: {
        type: DataTypes.ENUM('cartao de credito', 'cartao de debito', 'boleto', 'pix'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pendente', 'aprovado', 'recusado'),
        allowNull: false,
    }
});

module.exports = Pagamento;