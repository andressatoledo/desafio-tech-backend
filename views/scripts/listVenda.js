import { URL } from "./utils/config.js";
import { validarToken } from "./utils/validarToken.js";

async function carregarVendas() {

    try {
        const response = await fetch(`${URL}/venda`);
        if (!response.ok) {
            console.log("Falha ao buscar vendas.");
        }

        const vendas = await response.json();
        
        const tabela = document.getElementById("tabelaVendas");
         tabela.innerHTML = `<thead>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>Data</th>
                <th>Valor total (R$)</th>
                <th>Forma de pagamento</th>
                <th>Status</th>
            </tr>
        </thead>`
        tabela.innerHTML += vendas.map(venda => `
      <tr>
        <td>
            <button title="Mostrar" class="botao-icone" tooltip="Mostrar" onclick="window.location.href='vendas.html?id=${venda.VendaId}&mode=display'">
                <i class="fas fa-eye"></i>
            </button>
        </td>
        <td>
            <button title="Editar" class="botao-icone" tooltip="Editar" onclick="window.location.href='vendas.html?id=${venda.VendaId}&mode=update'">
                <i class="fas fa-edit"></i>
            </button>
        </td>
        <td>
            <button title="Deletar" class="botao-icone" tooltip="Deletar" onclick="deletarVenda(${venda.VendaId})">
                <i class="fas fa-trash-alt"></i>
            </button>
        </td>
        
        <td>${venda.VendaData}</td>
        <td>${venda.VendaValorTotal}</td>
        <td>${venda.VendaFormaPagamento}</td>
        <td>${venda.VendaStatus}</td>
      </tr>
    `).join("");

    } catch (error) {
        console.error(error);
    }
}


async function deletarVenda(VendaId) {
    const confirmar = confirm("Deseja excluir este venda?");
    if (!confirmar) {
        return;
    }

    try {
        const response = await fetch(`${URL}/venda/${VendaId}`, { method: "DELETE" });
        console.log(response);
        if (!response.ok) {
            console.log("Falha ao deletar venda.");
        } else {

            alert("Venda deletada com sucesso.");
            carregarVendas();
        }

    } catch (error) {
        console.error(error);
    }
};

window.addEventListener("load", () => {
    validarToken();
});

window.deletarVenda = deletarVenda;

document.addEventListener("DOMContentLoaded", carregarVendas);
const btnInserir = document.getElementById("btnInserir");

btnInserir.addEventListener("click", () => {
    window.location.href = 'vendas.html?id=&mode=insert';
});