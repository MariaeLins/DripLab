const produto = JSON.parse(
    localStorage.getItem("produtoSelecionado")
);

const CHAVE_CARRINHO = "carrinho";

const imagem = document.getElementById("imagem-detalhe");
const nome = document.getElementById("nome-detalhe");
const categoria = document.getElementById("categoria-detalhe");
const preco = document.getElementById("preco-detalhe");
const descricao = document.getElementById("descricao-detalhe");

const containerTamanho = document.getElementById("opcoes-tamanho-container");
const containerCor = document.getElementById("opcoes-cor-container");

const selectTamanho = document.getElementById("tamanho-detalhe");
const selectCor = document.getElementById("cor-detalhe");

const quantidade = document.getElementById("quantidade-detalhe");
const botaoAdicionar = document.getElementById("adicionar-carrinho-detalhe");
const mensagem = document.getElementById("mensagem-produto");

function preencherOpcoes(select, opcoes) {
    select.innerHTML = "";

    opcoes.forEach(opcao => {
        const elemento = document.createElement("option");
        elemento.value = opcao;
        elemento.textContent = opcao;
        select.appendChild(elemento);
    });
}

if (produto) {
    imagem.src = produto.imagem;
    imagem.alt = produto.nome;

    nome.textContent = produto.nome;
    categoria.textContent = produto.categoria;
    preco.textContent = produto.preco;
    descricao.textContent = produto.descricao;

    if (produto.tamanhos && produto.tamanhos.length > 0) {
        preencherOpcoes(selectTamanho, produto.tamanhos);
    } else {
        containerTamanho.style.display = "none";
    }

    if (produto.cores && produto.cores.length > 0) {
        preencherOpcoes(selectCor, produto.cores);
    } else {
        containerCor.style.display = "none";
    }
} else {
    document.querySelector(".detalhes-produto").innerHTML =
        "<p>Produto não encontrado. Volte à loja e escolha um produto.</p>";
}

botaoAdicionar.addEventListener("click", () => {
    if (!produto) return;

    const carrinho = JSON.parse(
        localStorage.getItem(CHAVE_CARRINHO)
    ) || [];

    const item = {
        id: produto.id,
        nome: produto.nome,
        preco: Number(
            produto.preco.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()
        ),
        imagem: produto.imagem,
        tamanho: selectTamanho.value || "",
        cor: selectCor.value || "",
        quantidade: Math.max(1, Number(quantidade.value) || 1)
    };

    const existente = carrinho.find(produtoCarrinho =>
        produtoCarrinho.id === item.id &&
        produtoCarrinho.tamanho === item.tamanho &&
        produtoCarrinho.cor === item.cor
    );

    if (existente) {
        existente.quantidade += item.quantidade;
    } else {
        carrinho.push(item);
    }

    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));

    mensagem.textContent = "Produto adicionado ao carrinho!";
});