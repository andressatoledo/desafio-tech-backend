
document.addEventListener("DOMContentLoaded", () => {
    const btnCliente = document.getElementById("btnCliente");
    const btnUsuario = document.getElementById("btnUsuario");
    const btnVenda = document.getElementById("btnVenda");

    btnCliente.addEventListener("click", () => {
                window.location.href = "./listCliente.html";
    });

    btnUsuario.addEventListener("click", () => {
        window.location.href = "./listUsuario.html";
    });

    btnVenda.addEventListener("click", () => {
        window.location.href = "./listVenda.html";
    });
});
