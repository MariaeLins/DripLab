
const CHAVE_CARRINHO = "carrinho";

const listaCarrinho = document.getElementById("lista-carrinho");
const mensagemCarrinho = document.getElementById("mensagem-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");

function obterCarrinho() {
    return JSON.parse(localStorage.getItem(CHAVE_CARRINHO)) || [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarCarrinho() {
    const carrinho = obterCarrinho();

    listaCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        mensagemCarrinho.style.display = "block";
        totalCarrinho.textContent = formatarPreco(0);
        return;
    }

    mensagemCarrinho.style.display = "none";

    let total = 0;

    carrinho.forEach((produto, indice) => {
        total += produto.preco * produto.quantidade;

        const item = document.createElement("article");
        item.classList.add("item-carrinho");

        const detalhes = [
            produto.tamanho ? `Tamanho: ${produto.tamanho}` : "",
            produto.cor ? `Cor: ${produto.cor}` : ""
        ].filter(Boolean).join(" | ");

        item.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">

            <div class="dados-item">
                <h3>${produto.nome}</h3>
                <p>${detalhes}</p>
                <p>${formatarPreco(produto.preco)}</p>

                <div class="controles-quantidade">
                    <button data-acao="diminuir" data-indice="${indice}">−</button>

                    <span>${produto.quantidade}</span>

                    <button data-acao="aumentar" data-indice="${indice}">+</button>
                </div>

                <button class="remover-item"
                    data-acao="remover"
                    data-indice="${indice}">
                    REMOVER
                </button>
            </div>
        `;

        listaCarrinho.appendChild(item);
    });

    totalCarrinho.textContent = formatarPreco(total);
}

listaCarrinho.addEventListener("click", (evento) => {
    const botao = evento.target.closest("button[data-acao]");

    if (!botao) return;

    const carrinho = obterCarrinho();
    const indice = Number(botao.dataset.indice);
    const acao = botao.dataset.acao;

    if (!carrinho[indice]) return;

    if (acao === "aumentar") {
        carrinho[indice].quantidade++;
    }

    if (acao === "diminuir") {
        carrinho[indice].quantidade--;

        if (carrinho[indice].quantidade <= 0) {
            carrinho.splice(indice, 1);
        }
    }

    if (acao === "remover") {
        carrinho.splice(indice, 1);
    }

    salvarCarrinho(carrinho);
    window.dispatchEvent(new Event("carrinhoAtualizado"));
    mostrarCarrinho();
});

mostrarCarrinho();
