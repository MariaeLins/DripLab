const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
    id_pedido:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    valor_total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    data_pedido: {
        type: DataTypes.DATETIME,
        allowNull: false,
    }
});

module.exports = Pedido;