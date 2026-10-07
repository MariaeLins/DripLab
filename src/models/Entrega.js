const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
    id_entrega: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
