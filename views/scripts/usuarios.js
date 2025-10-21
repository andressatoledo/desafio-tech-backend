
import { URL } from "./utils/config.js";
import { validarEmail } from "./utils/validarEmail.js";
import { validarToken } from "./utils/validarToken.js";

async function recuperarUsuario(UsuarioId) {

    try {
        const response = await fetch(`${URL}/usuario/${UsuarioId}`);


        if (!response.ok) {
            console.log("Falha ao buscar usuário");
        }

        const usuarios = await response.json();
        const usuario = usuarios[0];
        console.log('usuarios',usuario);
        return usuario;

    } catch (error) {
        console.error(error);
    }
};


async function atualizarUsuario(UsuarioId) {
    const Nome = document.getElementById("nome").value;
    const Login = document.getElementById("login").value;
    const Email = document.getElementById("email").value;
    const Senha = document.getElementById("senha").value;
    const Status = document.getElementById("status").value;
    
    try {
        const response = await fetch(`${URL}/usuario/${UsuarioId}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                UsuarioNome: Nome,
                UsuarioLogin: Login,
                UsuarioEmail: Email,
                UsuarioSenha: Senha,
                UsuarioStatus: Status})});


        if (!response.ok) {
            console.log("Falha ao atualizar usuário.");
        }

        const usuarios = await response.json();
        if (usuarios.length > 1) {
            alert("Login ou e-mail já cadastrado.");
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

    const UsuarioId = params.get("id");
    const modo = params.get("mode");

    const UsuarioData = await recuperarUsuario(UsuarioId);
    document.getElementById("nome").value = UsuarioData.UsuarioNome;
    document.getElementById("login").value = UsuarioData.UsuarioLogin;
    document.getElementById("email").value = UsuarioData.UsuarioEmail;
    document.getElementById("senha").value = UsuarioData.UsuarioSenha;
    document.getElementById("status").value = UsuarioData.UsuarioStatus;
   
    const Nome = document.getElementById("nome").value;
    const Login = document.getElementById("login").value;
    const Email = document.getElementById("email").value;
    const Senha = document.getElementById("senha").value;
    const Status = document.getElementById("status").value;

    document.querySelector("#senha").style.display = "none";
    document.querySelector("#labelsenha").style.display = "none";

    if (modo === "display") {

        const inputs = document.querySelectorAll("input, select, textarea");
        inputs.forEach(input => {
            input.disabled = true;
        });

        document.querySelector("#btnConfirmar").style.display = "none";

    }

    const btnConfirmar = document.getElementById("btnConfirmar");
    const btnFechar = document.getElementById("btnFechar");

    btnFechar.addEventListener("click", () => {
        window.location.href = "./listUsuario.html";
    });

    btnConfirmar.addEventListener("click", () => {

        if (!Nome || !Login || !Email || !Senha || !Status) {
            alert("Preencha todos os campos.");
            return;
        } else {
            if (!validarEmail(Email)) {
                alert("Digite um e-mail válido.");
                return;
            } else {
                atualizarUsuario(UsuarioId);
                alert('Usuário atualizado com sucesso.')
            }

        }
    })
});
