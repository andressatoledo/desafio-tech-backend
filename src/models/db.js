import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config()

async function criarTabelas() {
    var conexao = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
    });
    await conexao.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`);
    
    var conexao = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });

    console.log("Conexão com MySQL estabelecida.");

    await conexao.query(`
    CREATE TABLE IF NOT EXISTS Usuario (
        UsuarioId INT AUTO_INCREMENT PRIMARY KEY,
        UsuarioNome VARCHAR(100) NOT NULL,
        UsuarioLogin VARCHAR(50) NOT NULL UNIQUE,
        UsuarioSenha VARCHAR(255) NOT NULL,
        UsuarioEmail VARCHAR(100) NOT NULL UNIQUE,
        UsuarioStatus ENUM('ativo','inativo','bloqueado') DEFAULT 'ativo',
        DataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

await conexao.query(`
    CREATE TABLE IF NOT EXISTS Cliente (
        ClienteId INT AUTO_INCREMENT PRIMARY KEY,
        ClienteNome VARCHAR(120) NOT NULL,
        ClienteDocumentoIdentificador VARCHAR(20) NOT NULL UNIQUE,
        ClienteEmail VARCHAR(100),
        ClienteTelefone VARCHAR(20),
        ClienteLogradouro VARCHAR(150),
        ClienteCidade VARCHAR(80),
        ClienteEstado CHAR(2),
        ClienteBairro VARCHAR(80),
        ClienteNumero VARCHAR(10),
        ClienteCEP VARCHAR(10),
        ClienteDataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ClienteStatus ENUM('ativo','inativo') DEFAULT 'ativo'
    )
`);

await conexao.query(`
    CREATE TABLE IF NOT EXISTS Venda (
        VendaId INT AUTO_INCREMENT PRIMARY KEY,
        ClienteId INT NOT NULL,
        VendaData TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        VendaValorTotal DECIMAL(10,2) NOT NULL,
        VendaFormaPagamento ENUM('Dinheiro','Cartão','Pix') NOT NULL,
        VendaStatus ENUM('Pendente','Pago','Cancelado') DEFAULT 'Pendente',
        FOREIGN KEY (ClienteId) REFERENCES Cliente(ClienteId) ON DELETE CASCADE
    )
`);

    console.log("Tabelas criadas com sucesso.");
    await conexao.end();
}

criarTabelas().catch(console.error);



