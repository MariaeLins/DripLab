
const token = sessionStorage.getItem("token");

const campoCep = document.getElementById("perfil-cep");
const campoEndereco = document.getElementById("perfil-endereco");
const botaoSalvar = document.getElementById("salvar-endereco");
const botaoSair = document.getElementById("botao-sair");

if (!token) {
    window.location.href = "./login.html";
} else {
    carregarPerfil();
}

// CARREGAR DADOS DO CLIENTE

async function carregarPerfil() {
    try {
        const cliente = await requisicaoAPI("/clientes/me");

        document.getElementById("perfil-nome").textContent =
            cliente.nome || "Não informado";

        document.getElementById("perfil-email").textContent =
            cliente.email || "Não informado";

        document.getElementById("perfil-telefone").textContent =
            cliente.telefone || "Não informado";

        campoCep.value = cliente.cep || "";
        campoEndereco.value = cliente.endereco || "";

        campoCep.readOnly = true;
        campoEndereco.readOnly = true;

        botaoSalvar.style.display = "none";

    } catch (erro) {
        alert(erro.message);
    }
}

// PERMITIR EDITAR AO CLICAR

function habilitarEdicao(campo) {
    campo.readOnly = false;
    campo.focus();

    botaoSalvar.style.display = "block";
}

campoCep.addEventListener("click", function () {
    habilitarEdicao(campoCep);
});

campoEndereco.addEventListener("click", function () {
    habilitarEdicao(campoEndereco);
});

// MOSTRAR BOTÃO QUANDO HOUVER ALTERAÇÃO

campoCep.addEventListener("input", function () {
    botaoSalvar.style.display = "block";
});

campoEndereco.addEventListener("input", function () {
    botaoSalvar.style.display = "block";
});

// SALVAR ENDEREÇO NO BANCO DE DADOS

botaoSalvar.addEventListener("click", async function () {
    const cep = campoCep.value.trim();
    const endereco = campoEndereco.value.trim();

    try {
        botaoSalvar.disabled = true;

        const resultado = await requisicaoAPI("/clientes/me", {
            method: "PUT",
            body: JSON.stringify({
                cep,
                endereco
            })
        });

        alert(resultado.mensagem || "Endereço atualizado com sucesso!");

        await carregarPerfil();

    } catch (erro) {
        alert(erro.message);
    } finally {
        botaoSalvar.disabled = false;
    }
});

// SAIR DA CONTA

if (botaoSair) {
    botaoSair.addEventListener("click", function () {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("cliente");

        window.location.href = "./index.html";
    });
}
