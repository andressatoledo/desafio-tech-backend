
import { URL } from "./utils/config.js";
import { validarToken } from "./utils/validarToken.js";



async function carregarClientes() {

    try {
        const response = await fetch(`${URL}/cliente`);
        if (!response.ok) {
            console.log("Falha ao buscar clientes.");
        }

        const clientes = await response.json();
        const comboCliente = document.getElementById("comboCliente");
        clientes.forEach(cliente => {
        const opcao = document.createElement("option");
            opcao.value = cliente.ClienteId;
            opcao.textContent = cliente.ClienteNome; 
            comboCliente.appendChild(opcao);
        });


    } catch (error) {
        console.error(error);
    }
}

async function recuperarVenda(VendaId) {

    try {
        const response = await fetch(`${URL}/venda/${VendaId}`);

        if (!response.ok) {
            console.log("Falha ao buscar venda");
        }

        const vendas = await response.json();
        const venda = vendas[0];
        return venda;
        

    } catch (error) {
        console.error(error);
    }
};



async function criarVenda() {

    const Cliente = document.getElementById("comboCliente").value;
    const Data = document.getElementById("data").value;
    const ValorTotal = document.getElementById("valorTotal").value;
    const FormaPagamento = document.getElementById("formaPagamento").value;
    const Status = document.getElementById("status").value;
    
    try {
        const response = await fetch(`${URL}/venda/`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ClienteId: Cliente,
                VendaData: Data,
                VendaValorTotal: ValorTotal,
                VendaFormaPagamento: FormaPagamento,
                VendaStatus: Status
         })});


        if (!response.ok) {
            console.log("Falha ao criar venda.");
        }

            
    } catch (error) {
        console.error(error);
    }    
};


async function atualizarVenda(VendaId) {

    const Cliente = document.getElementById("comboCliente").value;
    const Data = document.getElementById("data").value;
    const ValorTotal = document.getElementById("valorTotal").value;
    const FormaPagamento = document.getElementById("formaPagamento").value;
    const Status = document.getElementById("status").value;
    
    try {
        const response = await fetch(`${URL}/venda/${VendaId}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ClienteId: Cliente,
                VendaData: Data,
                VendaValorTotal: ValorTotal,
                VendaFormaPagamento: FormaPagamento,
                VendaStatus: Status
            })});


        if (!response.ok) {
            console.log("Falha ao atualizar venda.");
        }
             
    } catch (error) {
        console.error(error);
    }    
};

document.addEventListener("DOMContentLoaded", async () => {
    window.addEventListener("load", () => {
        validarToken();
    });
    const params = new URLSearchParams(window.location.search);
    const btnConfirmar = document.getElementById("btnConfirmar");
    const btnFechar = document.getElementById("btnFechar");
    carregarClientes();

    const VendaId = params.get("id");
    const modo = params.get("mode");

    if (modo === "display") {

        const inputs = document.querySelectorAll("input, select, textarea");
        inputs.forEach(input => {
            input.disabled = true;
        });

        document.querySelector("#btnConfirmar").style.display = "none";

    }

    
    btnFechar.addEventListener("click", () => {
        window.location.href = "./listVenda.html";
    });


    if (modo === "update" || modo === "display"){
        const VendaData = await recuperarVenda(VendaId);
        document.getElementById("comboCliente").value = VendaData.ClienteId;
        document.getElementById("data").value = VendaData.VendaData;
        document.getElementById("valorTotal").value = VendaData.VendaValorTotal;
        document.getElementById("formaPagamento").value = VendaData.VendaFormaPagamento;
        document.getElementById("status").value = VendaData.VendaStatus;
    }

    btnConfirmar.addEventListener("click", () => {
        const Cliente = document.getElementById("comboCliente").value;
        const Data = document.getElementById("data").value;
        const ValorTotal = document.getElementById("valorTotal").value;
        const FormaPagamento = document.getElementById("formaPagamento").value;
        const Status = document.getElementById("status").value;

        if (!Cliente || !Data || !ValorTotal || !FormaPagamento || !Status) {
            alert("Preencha todos os campos.");
            return;
        } else {
                if (modo === "update"){
                    atualizarVenda(VendaId);
                    alert('Venda atualizado com sucesso.')
                } else{
                    criarVenda();
                    alert('Venda criado com sucesso.')
                }
                
            }
        }
    )});
