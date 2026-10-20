const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Item_pedido = sequelize.define('Item_pedido', {
    id_item_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    preco_unitario: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

module.exports = Item_pedido;