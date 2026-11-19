
const API_URL = 'http://localhost:3000';

async function requisicaoAPI(endpoint, opcoes = {}) {
    const token = sessionStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...opcoes.headers
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const resposta = await fetch(`${API_URL}${endpoint}`, {
        ...opcoes,
        headers
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
        throw new Error(
            resultado.mensagem || 'Erro ao comunicar com o servidor'
        );
    }

    return resultado;
}
