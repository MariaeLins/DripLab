
const formulario = document.getElementById("form-login");

formulario.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
        const resultado = await requisicaoAPI("/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                senha
            })
        });

        sessionStorage.setItem("token", resultado.token);

        sessionStorage.setItem(
            "cliente",
            JSON.stringify(resultado.cliente)
        );

        window.location.href = "./index.html";

    } catch (erro) {
        alert(erro.message);
    }
});
