
/* JANELA DE PESQUISA */

const janela = document.querySelector("#janela-pesquisa");
const botaoAbrir = document.querySelector("#abrir-pesquisa");
const conteudo = document.querySelector(".conteudo-pesquisa");
const campo = document.querySelector("#campo-pesquisa");

if (janela && botaoAbrir && conteudo && campo) {

    // Abrir a janela
    botaoAbrir.addEventListener("click", function () {
        janela.classList.add("ativo");
        campo.focus();
    });

    // Fechar ao clicar fora
    janela.addEventListener("click", function (event) {
        if (!conteudo.contains(event.target)) {
            janela.classList.remove("ativo");
            campo.blur();
        }
    });

    // Impedir que cliques dentro fechem a pesquisa
    conteudo.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    // Fechar com ESC
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            janela.classList.remove("ativo");
            campo.blur();
        }
    });
}


/* TEXTOS ROTATIVOS DO CONTAINER HOME */

const textos = [
    "ENTRE EM CONTATO CONOSCO!",
    "OFERTAS E DESCONTOS!",
    "DRIP E SWAG É DRIPLAB!",
    "SEJA QUEM VOCÊ É CONOSCO!"
];

const cores = [
    "#000000",
    "#EB238B",
    "#5E00FF",
    "#B9CE34"
];

let indiceTexto = 0;

const textoRotativo = document.getElementById("texto-rotativo");

if (textoRotativo) {

    setInterval(function () {

        textoRotativo.style.opacity = 0;

        setTimeout(function () {

            indiceTexto = (indiceTexto + 1) % textos.length;

            textoRotativo.textContent = textos[indiceTexto];
            textoRotativo.style.color = cores[indiceTexto];

            textoRotativo.style.opacity = 1;

        }, 500);

    }, 3000);
}
