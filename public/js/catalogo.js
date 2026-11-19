
const CHAVE_RECENTES = "produtosRecentes";
const CHAVE_PRODUTO_SELECIONADO = "produtoSelecionado";

function obterProdutosDaPagina() {
    return Array.from(document.querySelectorAll(".card-produto")).map((card, indice) => {

        const imagem = card.querySelector(".imagem-produto img");
        const nome = card.querySelector(".info-produto h3");
        const preco = card.querySelector(".preco-produto");

        const tamanhos = Array.from(
            card.querySelectorAll(".opcao-tamanho option")
        ).map(opcao => opcao.value || opcao.textContent.trim());

        const cores = Array.from(
            card.querySelectorAll(".opcao-cor option")
        ).map(opcao => opcao.value || opcao.textContent.trim());

        return {
            id: card.dataset.id || `produto-${indice + 1}`,
            nome: nome ? nome.textContent.trim() : "Produto DripLab",
            preco: preco ? preco.textContent.trim() : "",
            imagem: imagem ? imagem.getAttribute("src") : "",
            descricao: `Conheça o ${nome ? nome.textContent.trim() : "produto DripLab"}. Uma peça da nossa coleção de ${card.closest(".galeria-acessorios") ? "moletons" : "camisas"} streetwear.`,
            categoria: card.closest(".galeria-acessorios")
                ? "Moletom"
                : "Camisa",
                tamanhos,
                cores
        };
    });
}

function salvarProdutoSelecionado(produto) {

    localStorage.setItem(
        CHAVE_PRODUTO_SELECIONADO,
        JSON.stringify(produto)
    );

    let recentes = JSON.parse(localStorage.getItem(CHAVE_RECENTES)) || [];

    recentes = recentes.filter(item => item.id !== produto.id);
    recentes.unshift(produto);
    recentes = recentes.slice(0, 4);

    localStorage.setItem(CHAVE_RECENTES, JSON.stringify(recentes));

    window.location.href = "./produto.html";
}

function carregarProdutosRecentes() {

    const container = document.getElementById("itens-recentes");

    if (!container) return;

    const recentes = JSON.parse(localStorage.getItem(CHAVE_RECENTES)) || [];

    container.innerHTML = "";

    if (recentes.length === 0) {
        container.innerHTML = "<p>Nenhum produto visitado ainda.</p>";
        return;
    }

    recentes.forEach(produto => {

        const item = document.createElement("button");

        item.type = "button";
        item.className = "produto-recente";

        item.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <span>${produto.nome}</span>
        `;

        item.addEventListener("click", () => {
            salvarProdutoSelecionado(produto);
        });

        container.appendChild(item);
    });
}

function pesquisarProdutos(event, produtos) {

    event.preventDefault();

    const campo = document.getElementById("campo-pesquisa");
    const resultados = document.getElementById("resultados-pesquisa");
    const lista = document.getElementById("lista-resultados");
    const recentes = document.querySelector(".pesquisas-recentes");

    const termo = campo.value.trim().toLowerCase();

    lista.innerHTML = "";

    if (!termo) {
        resultados.style.display = "none";
        recentes.style.display = "block";
        return;
    }

    const encontrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo) ||
        produto.descricao.toLowerCase().includes(termo)
    );

    recentes.style.display = "none";
    resultados.style.display = "block";

    if (encontrados.length === 0) {
        lista.innerHTML = "<p class='nenhum-resultado'>Nenhum produto encontrado.</p>";
        return;
    }

    encontrados.forEach(produto => {

        const item = document.createElement("button");

        item.type = "button";
        item.className = "resultado-produto";

        item.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <span class="resultado-info">
                <strong>${produto.nome}</strong>
                <small>${produto.categoria}</small>
                <small>${produto.preco}</small>
            </span>
        `;

        item.addEventListener("click", () => {
            salvarProdutoSelecionado(produto);
        });

        lista.appendChild(item);
    });
}

function carregarCatalogo(url, seletorOrigem, seletorDestino) {

    return fetch(url)
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error("Não foi possível carregar o catálogo.");
            }

            return resposta.text();
        })
        .then(html => {

            const documento = new DOMParser().parseFromString(html, "text/html");

            const galeriaOriginal = documento.querySelector(seletorOrigem);
            const galeriaAtual = document.querySelector(seletorDestino);

            if (galeriaOriginal && galeriaAtual) {
                galeriaAtual.innerHTML = galeriaOriginal.innerHTML;
            }
        })
        .catch(erro => {
            console.error("Erro ao carregar catálogo:", erro);
        });
}

document.addEventListener("DOMContentLoaded", async () => {

    if (document.body.id === "pagina-pecas") {
        await carregarCatalogo(
            "./index.html",
            ".galeria-pecas",
            "#lista-pecas"
        );
    }

    if (document.body.id === "pagina-acessorios") {
        await carregarCatalogo(
            "./index.html",
            ".galeria-acessorios",
            "#lista-acessorios"
        );
    }

    const produtos = obterProdutosDaPagina();

    document.querySelectorAll(".card-produto").forEach(card => {

        card.style.cursor = "pointer";

        card.addEventListener("click", event => {

            if (event.target.closest("select")) return;

            const cards = Array.from(document.querySelectorAll(".card-produto"));
            const indice = cards.indexOf(card);

            if (indice >= 0 && produtos[indice]) {
                salvarProdutoSelecionado(produtos[indice]);
            }
        });
    });

    const formulario = document.getElementById("form-pesquisa");

    if (formulario) {
        formulario.addEventListener("submit", event => {
            pesquisarProdutos(event, produtos);
        });
    }

    const campo = document.getElementById("campo-pesquisa");

    if (campo) {
        campo.addEventListener("input", () => {

            if (campo.value.trim() === "") {

                document.getElementById("resultados-pesquisa").style.display = "none";

                const recentes = document.querySelector(".pesquisas-recentes");

                if (recentes) {
                    recentes.style.display = "block";
                }
            }
        });
    }

    carregarProdutosRecentes();
});
