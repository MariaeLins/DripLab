const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const clienteRoutes = require('./routes/clienteRoutes');
const authRoutes = require('./routes/authRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const variacaoProdutoRoutes = require('./routes/variacaoProdutoRoutes');
const carrinhoRoutes = require('./routes/carrinhoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes');
const entregaRoutes = require('./routes/entregaRoutes');
const solicitacaoParceriaRoutes = require('./routes/solicitacaoParceriaRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(clienteRoutes);
app.use(authRoutes);
app.use(categoriaRoutes);
app.use(produtoRoutes);
app.use(variacaoProdutoRoutes);
app.use(carrinhoRoutes);
app.use(pedidoRoutes);
app.use(pagamentoRoutes);
app.use(entregaRoutes);
app.use(solicitacaoParceriaRoutes);

sequelize.authenticate()
    .then(() => console.log('Conectado ao banco de dados'))
    .catch(erro => console.error('Erro ao conectar:', erro));

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
