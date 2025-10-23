import connection from "../models/connection.js"; 

/**
 * Recupera todos os clientes cadastrados no banco.
 * @returns {Promise<Array>} Retorna um array com todos os clientes.
 */
export async function recuperarClientesService() {
    const [rows] = await connection.query("SELECT * FROM Cliente");
    return rows;

}

/**
 * Recupera um cliente pelo seu ID.
 * @param {number} ClienteId - ID do cliente a ser buscado.
 * @returns {Promise<Array>} Retorna um array com os dados do cliente.
 */
export async function recuperarClientesServiceById(ClienteId) {
   const sql = `SELECT * FROM Cliente Where ClienteId = ?`;
   const values = [ClienteId];
   const [rows]  = await connection.query(sql, values);
   return rows ;

}

/**
 * Cria um novo cliente no banco de dados.
 * @param {Object} ClienteData - Objeto com os dados do cliente.
 * @returns {Promise<number>} Retorna o ID do cliente inserido.
 */
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

/**
 * Atualiza os dados de um cliente existente.
 * @param {number} ClienteId - ID do cliente a ser atualizado.
 * @param {Object} ClienteData - Objeto com os dados atualizados do cliente.
 * @returns {Promise<Object>} Retorna o resultado da operação de atualização.
 */
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

/**
 * Deleta um cliente pelo ID.
 * @param {number} ClienteId - ID do cliente a ser deletado.
 * @returns {Promise<number>} Retorna a quantidade de linhas afetadas, caso retorne 0 quer dizer que não deletou nada.
 */
export async function deletarClienteServiceById(ClienteId) {
   const sql = `DELETE FROM Cliente WHERE ClienteId = ?`;
   const values = [ClienteId];
   const [result] = await connection.query(sql, values);
   return result.affectedRows;

}