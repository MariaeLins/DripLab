
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pedido = require('./Pedido');

const Pagamento = sequelize.define('Pagamento', {
    id_pagamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    forma_pagamento: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'Pendente'
    },
    data_pagamento: {
        type: DataTypes.DATE,
        allowNull: true
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Pedido,
            key: 'id_pedido'
        }
    }
}, {
    tableName: 'Pagamentos',
    timestamps: false
});

Pedido.hasOne(Pagamento, {
    foreignKey: 'id_pedido'
});

Pagamento.belongsTo(Pedido, {
    foreignKey: 'id_pedido'
});

module.exports = Pagamento;
