import { URL } from "./utils/config.js";
import { validarToken } from "./utils/validarToken.js";


async function carregarClientes() {

    try {
        const response = await fetch(`${URL}/cliente`);
        if (!response.ok) {
            console.log("Falha ao buscar clientes.");
        }

        const clientes = await response.json();
        
        const tabela = document.getElementById("tabelaClientes");
         tabela.innerHTML = `<thead>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>Nome</th>
                <th>CPF/CNPJ</th>
                <th>E-mail</th>
                <th>Status</th>
            </tr>
        </thead>`
        tabela.innerHTML += clientes.map(cliente => `
      <tr>
        <td>
            <button title="Mostrar" class="botao-icone" tooltip="Mostrar" onclick="window.location.href='clientes.html?id=${cliente.ClienteId}&mode=display'">
                <i class="fas fa-eye"></i>
            </button>
        </td>
        <td>
            <button title="Editar" class="botao-icone" tooltip="Editar" onclick="window.location.href='clientes.html?id=${cliente.ClienteId}&mode=update'">
                <i class="fas fa-edit"></i>
            </button>
        </td>
        <td>
            <button title="Deletar" class="botao-icone" tooltip="Deletar" onclick="deletarCliente(${cliente.ClienteId})">
                <i class="fas fa-trash-alt"></i>
            </button>
        </td>
        
        <td>${cliente.ClienteNome}</td>
        <td>${cliente.ClienteDocumentoIdentificador}</td>
        <td>${cliente.ClienteEmail}</td>
        <td>${cliente.ClienteCEP}</td>
      </tr>
    `).join("");

    } catch (error) {
        console.error(error);
    }
}


async function deletarCliente(ClienteId) {
    const confirmar = confirm("Deseja excluir este cliente?");
    if (!confirmar) {
        return;
    }

    try {
        const response = await fetch(`${URL}/cliente/${ClienteId}`, { method: "DELETE" });
        console.log(response);
        if (!response.ok) {
            console.log("Falha ao deletar cliente.");
        } else {

            alert("Cliente deletado com sucesso.");
            carregarClientes();
        }

    } catch (error) {
        console.error(error);
    }
};

 window.addEventListener("load", () => {
    validarToken();
  });

window.deletarCliente = deletarCliente;

document.addEventListener("DOMContentLoaded", carregarClientes);
const btnInserir = document.getElementById("btnInserir");

btnInserir.addEventListener("click", () => {
    window.location.href = 'clientes.html?id=&mode=insert';
});