
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');

const Pedido = sequelize.define('Pedido', {
    id_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data_pedido: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    valor_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'Pendente'
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cliente,
            key: 'id_cliente'
        }
    }
}, {
    tableName: 'Pedidos',
    timestamps: false
});

Cliente.hasMany(Pedido, {
    foreignKey: 'id_cliente'
});

Pedido.belongsTo(Cliente, {
    foreignKey: 'id_cliente'
});

module.exports = Pedido;
