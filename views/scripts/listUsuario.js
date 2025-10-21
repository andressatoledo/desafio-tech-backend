import { URL } from "./utils/config.js";
import { validarToken } from "./utils/validarToken.js";


async function carregarUsuarios() {

    try {
        const response = await fetch(`${URL}/usuario`);
        if (!response.ok) {
            console.log("Falha ao buscar usuários.");
        }

        const usuarios = await response.json();
        const tabela = document.getElementById("tabelaUsuarios");

        tabela.innerHTML = `<thead>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>Nome</th>
                <th>Login</th>
                <th>Email</th>
                <th>Status</th>
            </tr>
        </thead>`

        tabela.innerHTML += usuarios.map(usuario => `
      <tr>
        <td>
            <button title="Mostrar" class="botao-icone" tooltip="Mostrar" onclick="window.location.href='usuarios.html?id=${usuario.UsuarioId}&mode=display'">
                <i class="fas fa-eye"></i>
            </button>
        </td>
        <td>
            <button title="Editar" class="botao-icone" tooltip="Editar" onclick="window.location.href='usuarios.html?id=${usuario.UsuarioId}&mode=update'">
                <i class="fas fa-edit"></i>
            </button>
        </td>
        <td>
            <button title="Deletar" class="botao-icone" tooltip="Deletar" onclick="deletarUsuario(${usuario.UsuarioId})">
                <i class="fas fa-trash-alt"></i>
            </button>
        </td>
        <td>${usuario.UsuarioNome}</td>
        <td>${usuario.UsuarioLogin}</td>
        <td>${usuario.UsuarioEmail}</td>
        <td>${usuario.UsuarioStatus}</td>
      </tr>
    `).join("");

    } catch (error) {
        console.error(error);
    }
}


async function deletarUsuario(UsuarioId) {
    const confirmar = confirm("Deseja excluir este usuário?");
    if (!confirmar) {
        return;
    }

    try {
        const response = await fetch(`${URL}/usuario/${UsuarioId}`, { method: "DELETE" });
        console.log(response);
        if (!response.ok) {
            console.log("Falha ao deletar usuário.");
        } else {

            alert("Usuário deletado com sucesso.");
            carregarUsuarios();
        }

    } catch (error) {
        console.error(error);
    }
};

window.addEventListener("load", () => {
    validarToken();
});
window.deletarUsuario = deletarUsuario;

document.addEventListener("DOMContentLoaded", carregarUsuarios);
