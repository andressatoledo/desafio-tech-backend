import connection from "../models/connection.js";

/**
 * Recupera todas as vendas cadastrados no banco.
 * @returns {Promise<Array>} Retorna um array com todas as vendas.
 */
export async function recuperarVendasService() {
  const [rows] = await connection.query("SELECT * FROM Venda");
  return rows;

}


/**
 * Recupera uma venda pelo seu ID.
 * @param {number} VendaId - ID da venda a ser buscada.
 * @returns {Promise<Array>} Retorna um array com os dados da venda.
 */
export async function recuperarVendasServiceById(VendaId) {
  const sql = `SELECT * FROM Venda Where VendaId = ?`;
  const values = [VendaId];
  const [rows] = await connection.query(sql, values);
  return rows;
}



/**
 * Cria uma nova venda no banco de dados.
 * @param {Object} VendaData - Objeto com os dados da venda.
 * @returns {Promise<number>} Retorna o ID da venda inserida.
 */
export async function criarVendaService(vendaData) {

  const sql = `
    INSERT INTO Venda (ClienteId, VendaValorTotal, VendaFormaPagamento, VendaStatus)
    VALUES (?, ?, ?, ?)
  `;

  const values = [
    vendaData.ClienteId,
    vendaData.VendaValorTotal,
    vendaData.VendaFormaPagamento,
    vendaData.VendaStatus,
  ];

  // const [result] = await connection.query(sql, values);
  try {
    const [result] = await connection.query(sql, values);
    return result.affectedRows;
  } catch (error) {
    console.error("Erro no query:", error);
    throw error;
  }
}


/**
 * Atualiza os dados de uma venda existente.
 * @param {number} VendaId - ID da venda a ser atualizada.
 * @param {Object} VendaData - Objeto com os dados atualizados da venda.
 * @returns {Promise<Object>} Retorna o resultado da operação de atualização.
 */
export async function atualizarVendaService(VendaId, vendaData) {
  const sql = `UPDATE Venda SET ClienteId = ?, VendaValorTotal = ?, VendaFormaPagamento = ?, VendaStatus = ? WHERE VendaId = ?; `;

  const values = [
    vendaData.ClienteId,
    vendaData.VendaValorTotal,
    vendaData.VendaFormaPagamento,
    vendaData.VendaStatus,
    VendaId
  ];

  const [result] = await connection.query(sql, values);
  return result;
}



/**
 * Deleta uma venda pelo ID.
 * @param {number} ClienteId - ID da venda a ser deletada.
 * @returns {Promise<number>} Retorna a quantidade de linhas afetadas, caso retorne 0 quer dizer que não deletou nada.
 */
export async function deletarVendaServiceById(VendaId) {
  const sql = `DELETE FROM Venda Where VendaId = ?`;
  const values = [VendaId];
  const [result] = await connection.query(sql, values);
  return result.affectedRows;

}