export function validarToken(){
    const getToken = localStorage.getItem("USUARIO_TOKEN");
    if (!getToken) {
        alert("Sessão expirada. Faça login novamente.");
        window.location.href = "../index.html";
    return;
  }
}