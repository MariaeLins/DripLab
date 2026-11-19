
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SolicitacaoParceria = sequelize.define('SolicitacaoParceria', {
    id_solicitacao: {
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
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    mensagem: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'Pendente'
    },
    data_solicitacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Solicitacoes_parceria',
    timestamps: false
});

module.exports = SolicitacaoParceria;
