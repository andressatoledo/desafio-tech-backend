import connection from "../models/connection.js";


export async function recuperarVendasService() {
  const [rows] = await connection.query("SELECT * FROM Venda");
  return rows;

}

export async function recuperarVendasServiceById(VendaId) {
  const sql = `SELECT * FROM Venda Where VendaId = ?`;
  const values = [VendaId];
  const [rows] = await connection.query(sql, values);
  return rows;
}



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
    console.log("result:", result);
    return result.affectedRows;
  } catch (error) {
    console.error("Erro no query:", error);
    throw error;
  }
  return result.insertId;
}

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



export async function deletarVendaServiceById(VendaId) {
  const sql = `DELETE FROM Venda Where VendaId = ?`;
  const values = [VendaId];
  const [result] = await connection.query(sql, values);
  return result.affectedRows;

}