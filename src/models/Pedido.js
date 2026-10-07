const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
    id_pedido:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idCliente: {
        type: DataTypes.INTEGER,
        notNull: false,
        references: {
            model: 'Cliente',