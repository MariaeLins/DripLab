
CREATE DATABASE IF NOT EXISTS db_driplab;

USE db_driplab;

CREATE TABLE IF NOT EXISTS Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    endereco VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS Categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    imagem VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    id_categoria INT NOT NULL,

    CONSTRAINT fk_produto_categoria
    FOREIGN KEY (id_categoria)
    REFERENCES Categorias(id_categoria)
);

CREATE TABLE IF NOT EXISTS Variacoes_produto (
    id_variacao INT AUTO_INCREMENT PRIMARY KEY,
    tamanho VARCHAR(30) NOT NULL,
    cor VARCHAR(50) NOT NULL,
    quant_estoque INT NOT NULL DEFAULT 0,
    id_produto INT NOT NULL,

    CONSTRAINT fk_variacao_produto
    FOREIGN KEY (id_produto)
    REFERENCES Produtos(id_produto),

    CONSTRAINT uk_produto_tamanho_cor
    UNIQUE (id_produto, tamanho, cor)
);

CREATE TABLE IF NOT EXISTS Carrinhos (
    id_carrinho INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL UNIQUE,

    FOREIGN KEY (id_cliente)
    REFERENCES Clientes(id_cliente)
);

CREATE TABLE IF NOT EXISTS Itens_carrinho (
    id_item_carrinho INT AUTO_INCREMENT PRIMARY KEY,
    quantidade INT NOT NULL,
    id_carrinho INT NOT NULL,
    id_variacao INT NOT NULL,

    FOREIGN KEY (id_carrinho)
        REFERENCES Carrinhos(id_carrinho),

    FOREIGN KEY (id_variacao)
        REFERENCES Variacoes_produto(id_variacao)
);

CREATE TABLE IF NOT EXISTS Pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    data_pedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    valor_total DECIMAL(10,2) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Pendente',
    id_cliente INT NOT NULL,

    FOREIGN KEY (id_cliente)
        REFERENCES Clientes(id_cliente)
);

CREATE TABLE IF NOT EXISTS Itens_pedido (
    id_item_pedido INT AUTO_INCREMENT PRIMARY KEY,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    id_pedido INT NOT NULL,
    id_variacao INT NOT NULL,

    FOREIGN KEY (id_pedido)
        REFERENCES Pedidos(id_pedido),

    FOREIGN KEY (id_variacao)
        REFERENCES Variacoes_produto(id_variacao)
);

CREATE TABLE IF NOT EXISTS Pagamentos (
    id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    forma_pagamento VARCHAR(50) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Pendente',
    data_pagamento DATETIME NULL,
    id_pedido INT NOT NULL UNIQUE,

    FOREIGN KEY (id_pedido)
        REFERENCES Pedidos(id_pedido)
);

CREATE TABLE IF NOT EXISTS Entregas (
    id_entrega INT AUTO_INCREMENT PRIMARY KEY,
    endereco_entrega VARCHAR(255) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Aguardando envio',
    codigo_rastreio VARCHAR(100) NULL,
    data_envio DATETIME NULL,
    data_entrega DATETIME NULL,
    id_pedido INT NOT NULL UNIQUE,
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido)
);


CREATE TABLE IF NOT EXISTS Solicitacoes_parceria (
    id_solicitacao INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    mensagem TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Pendente',
    data_solicitacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE Clientes
MODIFY cep VARCHAR(9) NULL;

ALTER TABLE Clientes
MODIFY endereco VARCHAR(255) NULL;

show TABLES;

SELECT * FROM Pedidos;

SELECT * FROM Itens_carrinho;

SELECT * FROM Solicitacoes_parceria;

SELECT * FROM Clientes;