 
 import { URL } from "./utils/config.js";

 async function validarUsuario(login,senha) {
    try {
        const response = await fetch(`${URL}/usuario/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login, senha })
        });

        const {error,token,usuario} = await response.json();
        
        if(token){
            localStorage.setItem("USUARIO_TOKEN", token);
            return usuario;
        }

    } catch (error) {
        console.error(error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const btnEntrar = document.getElementById("btnEntrar");
    const btnCadastrar = document.getElementById("btnCadastrar");
    btnEntrar.addEventListener("click", async () => {

        const Email = document.getElementById("login").value;
        const Senha = document.getElementById("senha").value;

        if (!Email || !Senha) {
            alert("Preencha todos os campos.");
            return;
        } else {
            const usuario = await validarUsuario(Email,Senha);
            if(usuario){
                window.location.href = "pages/home.html";
            }
        }
    });

    btnCadastrar.addEventListener("click", () => {
        window.location.href = "pages/cadastroUsuario.html";
    });

    localStorage.removeItem("USUARIO_TOKEN");
});
