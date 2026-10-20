const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Entrega = sequelize.define('Entrega', {
    id_entrega: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cod_rastreio: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.ENUM('pendente', 'em transito', 'entregue', 'cancelado'),
        allowNull: false,
    },
    data_entrega: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    data_saida: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Entrega;