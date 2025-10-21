import { URL } from "./utils/config.js";
import { validarEmail } from "./utils/validarEmail.js";


async function criarUsuario() {
    const Nome = document.getElementById("nome").value;
    const Login = document.getElementById("login").value;
    const Email = document.getElementById("email").value;
    const Senha = document.getElementById("senha").value;
    console.log(Nome,Login,Email,Senha);
    try {
        const response = await fetch(`${URL}/usuario`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                UsuarioNome: Nome,
                UsuarioLogin: Login,
                UsuarioEmail: Email,
                UsuarioSenha: Senha,
                UsuarioStatus: "ativo"})});

        const usuarios = await response.json();
        if (usuarios.length > 1) {
            alert("Login ou e-mail já cadastrado.");
        }
        
            
    } catch (error) {
        console.error(error);
    }    
};

async function validarUsuario(dataEmail) {
    try {
        const response = await fetch(`${URL}/usuario/login/${dataEmail}`);
        console.log('validar',response)

        const usuarios = await response.json();

        if (usuarios.length > 0) {
            alert("E-mail já cadastrado.");
        }
        else {
            criarUsuario();
            alert('Usuário criado com sucesso.')
        }
            
    } catch (error) {
        console.error(error);
    }    
};

  
document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("load", () => {
        validarToken();
    });
  const btnCadastrar = document.getElementById("btnCadastrar");
  const btnVoltar = document.getElementById("btnVoltar");

  

  btnVoltar.addEventListener("click", () => {
    window.location.href = "../index.html";
  });

   btnCadastrar.addEventListener("click", () => {
    const Nome = document.getElementById("nome").value;
    const Login = document.getElementById("login").value;
    const Email = document.getElementById("email").value;
    const Senha = document.getElementById("senha").value;
    if (!Nome || !Login || !Email || !Senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }else{
         if (!validarEmail(Email)) {
            alert("Digite um e-mail válido.");
            return;
         }else{
            validarUsuario(Email);
         }
       
    }
})});
