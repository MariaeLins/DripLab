
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pedido = require('./Pedido');

const Entrega = sequelize.define('Entrega', {
    id_entrega: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    endereco_entrega: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING(9),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'Aguardando envio'
    },
    codigo_rastreio: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    data_envio: {
        type: DataTypes.DATE,
        allowNull: true
    },
    data_entrega: {
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
    tableName: 'Entregas',
    timestamps: false
});

Pedido.hasOne(Entrega, {
    foreignKey: 'id_pedido'
});

Entrega.belongsTo(Pedido, {
    foreignKey: 'id_pedido'
});

module.exports = Entrega;
