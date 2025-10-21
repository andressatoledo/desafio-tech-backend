
import { URL } from "./utils/config.js";
import { validarToken } from "./utils/validarToken.js";

async function recuperarCliente(ClienteId) {

    try {
        const response = await fetch(`${URL}/cliente/${ClienteId}`);

        if (!response.ok) {
            console.log("Falha ao buscar cliente");
        }

        const clientes = await response.json();
        const cliente = clientes[0];
        console.log(cliente);
        return cliente;
        

    } catch (error) {
        console.error(error);
    }
};



async function criarCliente() {

    const Nome = document.getElementById("nome").value;
    const DocumentoIdentificador = document.getElementById("documentoIdentificador").value;
    const Email = document.getElementById("email").value;
    const Telefone = document.getElementById("telefone").value;
    const Cep = document.getElementById("cep").value;
    const Logradouro = document.getElementById("logradouro").value;
    const Cidade = document.getElementById("cidade").value;
    const Estado = document.getElementById("estado").value;
    const Bairro = document.getElementById("bairro").value;
    const Numero = document.getElementById("numero").value;
    
    try {
        const response = await fetch(`${URL}/cliente/`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ClienteNome: Nome,
                ClienteDocumentoIdentificador: DocumentoIdentificador,
                ClienteEmail: Email,
                ClienteTelefone: Telefone,
                ClienteLogradouro: Logradouro,
                ClienteCidade: Cidade,
                ClienteEstado: Estado,
                ClienteBairro: Bairro,
                ClienteNumero: Numero,
                ClienteCEP: Cep})});


        if (!response.ok) {
            console.log("Falha ao criar cliente.");
        }

        const clientes = await response.json();
        if (clientes.length > 1) {
            alert("Documento identificador já cadastrado.");
        }
        
            
    } catch (error) {
        console.error(error);
    }    
};


async function atualizarCliente(ClienteId) {

    const Nome = document.getElementById("nome").value;
    const DocumentoIdentificador = document.getElementById("documentoIdentificador").value;
    const Email = document.getElementById("email").value;
    const Telefone = document.getElementById("telefone").value;
    const Cep = document.getElementById("cep").value;
    const Logradouro = document.getElementById("logradouro").value;
    const Cidade = document.getElementById("cidade").value;
    const Estado = document.getElementById("estado").value;
    const Bairro = document.getElementById("bairro").value;
    const Numero = document.getElementById("numero").value;
    
    try {
        const response = await fetch(`${URL}/cliente/${ClienteId}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ClienteNome: Nome,
                ClienteDocumentoIdentificador: DocumentoIdentificador,
                ClienteEmail: Email,
                ClienteTelefone: Telefone,
                ClienteLogradouro: Logradouro,
                ClienteCidade: Cidade,
                ClienteEstado: Estado,
                ClienteBairro: Bairro,
                ClienteNumero: Numero,
                ClienteCEP: Cep})});


        if (!response.ok) {
            console.log("Falha ao atualizar cliente.");
        }

        const clientes = await response.json();
        if (clientes.length > 1) {
            alert("Documento identificador já cadastrado.");
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

    const ClienteId = params.get("id");
    const modo = params.get("mode");

    if (modo === "display") {

        const inputs = document.querySelectorAll("input, select, textarea");
        inputs.forEach(input => {
            input.disabled = true;
        });

        document.querySelector("#btnConfirmar").style.display = "none";

    }

    
    btnFechar.addEventListener("click", () => {
        window.location.href = "./listCliente.html";
    });


    if (modo === "update" || modo === "display"){
        const ClienteData = await recuperarCliente(ClienteId);
        console.log(ClienteData);
        document.getElementById("nome").value = ClienteData.ClienteNome;
        document.getElementById("documentoIdentificador").value = ClienteData.ClienteDocumentoIdentificador;
        document.getElementById("email").value = ClienteData.ClienteEmail;
        document.getElementById("telefone").value = ClienteData.ClienteTelefone;
        document.getElementById("cep").value = ClienteData.ClienteCEP;
        document.getElementById("logradouro").value = ClienteData.ClienteLogradouro;
        document.getElementById("cidade").value = ClienteData.ClienteCidade;
        document.getElementById("estado").value = ClienteData.ClienteEstado;
        document.getElementById("bairro").value = ClienteData.ClienteBairro;
        document.getElementById("numero").value = ClienteData.ClienteNumero;
        

    }

     
    btnConfirmar.addEventListener("click", () => {
        const Nome = document.getElementById("nome").value;
        const DocumentoIdentificador = document.getElementById("documentoIdentificador").value;
        const Email = document.getElementById("email").value;
        const Telefone = document.getElementById("telefone").value;
        const Cep = document.getElementById("cep").value;
        const Logradouro = document.getElementById("logradouro").value;
        const Cidade = document.getElementById("cidade").value;
        const Estado = document.getElementById("estado").value;
        const Bairro = document.getElementById("bairro").value;
        const Numero = document.getElementById("numero").value;
        if (!Nome || !Email || !DocumentoIdentificador || !Cep) {
            alert("Preencha todos os campos.");
            return;
        } else {
                if (modo === "update"){
                    atualizarCliente(ClienteId);
                    alert('Cliente atualizado com sucesso.')
                } else{
                    criarCliente();
                    alert('Cliente criado com sucesso.')
                }
                
            }

        }
    )});
