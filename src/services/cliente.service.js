import dotenv from "dotenv";
import connection from "../models/connection.js"; 

export async function recuperarClientesService() {
    const [rows] = await connection.query("SELECT * FROM Cliente");
    return rows;

}

export async function recuperarClientesServiceById(ClienteId) {
   const sql = `SELECT * FROM Cliente Where ClienteId = ?`;
   const values = [ClienteId];
   const [rows]  = await connection.query(sql, values);
   return rows ;

}

export async function criarClienteService(ClienteData) {

    const sql = `
    INSERT INTO Cliente (
        ClienteNome,
        ClienteDocumentoIdentificador,
        ClienteEmail,
        ClienteTelefone,
        ClienteLogradouro,
        ClienteCidade,
        ClienteEstado,
        ClienteBairro,
        ClienteNumero,
        ClienteCEP,
        ClienteDataCadastro,
        ClienteStatus
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        ClienteData.ClienteNome,
        ClienteData.ClienteDocumentoIdentificador,
        ClienteData.ClienteEmail,
        ClienteData.ClienteTelefone,
        ClienteData.ClienteLogradouro,
        ClienteData.ClienteCidade,
        ClienteData.ClienteEstado,
        ClienteData.ClienteBairro,
        ClienteData.ClienteNumero,
        ClienteData.ClienteCEP,
        ClienteData.ClienteDataCadastro,
        ClienteData.ClienteStatus || 'ativo'
    ];

  try {
      const [result] = await connection.query(sql, values);
      return result.insertId;
  } catch (error) {
      console.error('Erro ao inserir cliente:', error);
  }

}

export async function atualizarClienteService(ClienteId,ClienteData) {
  const sql = `
  UPDATE Cliente SET ClienteNome = ?, ClienteDocumentoIdentificador = ?,ClienteEmail = ?, ClienteTelefone = ?, ClienteLogradouro = ?,ClienteCidade = ?,ClienteEstado = ?, ClienteBairro = ?, ClienteNumero = ?, ClienteCEP = ?, ClienteStatus = ?
  WHERE ClienteId = ?;`;

   const values = [
        ClienteData.ClienteNome,
        ClienteData.ClienteDocumentoIdentificador,
        ClienteData.ClienteEmail,
        ClienteData.ClienteTelefone,
        ClienteData.ClienteLogradouro,
        ClienteData.ClienteCidade,
        ClienteData.ClienteEstado,
        ClienteData.ClienteBairro,
        ClienteData.ClienteNumero,
        ClienteData.ClienteCEP,
        ClienteData.ClienteStatus,
        ClienteId
    ];

  const [result] = await connection.query(sql, values);
  return result;
}


export async function deletarClienteServiceById(ClienteId) {
   const sql = `DELETE FROM Cliente WHERE ClienteId = ?`;
   const values = [ClienteId];
   const [result] = await connection.query(sql, values);
   return result.affectedRows;

}