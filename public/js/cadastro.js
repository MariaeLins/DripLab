
const formulario = document.getElementById("form-cadastro");

formulario.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    const dados = {
        nome,
        email,
        telefone,
        senha
    };

    try {
        await requisicaoAPI("/clientes", {
            method: "POST",
            body: JSON.stringify(dados)
        });

        const resultadoLogin = await requisicaoAPI("/login", {
            method: "POST",
            body: JSON.stringify({ email, senha })
        });

        sessionStorage.setItem("token", resultadoLogin.token);

        sessionStorage.setItem(
            "cliente",
            JSON.stringify(resultadoLogin.cliente)
        );

        window.location.href = "./index.html";

    } catch (erro) {
        alert(erro.message);
    }
});
