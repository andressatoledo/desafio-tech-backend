import connection from "../models/connection.js"; 
import bcrypt from "bcrypt";
import {criptografarSenha} from "../utils/criptografarSenha.js";

/**
 * Recupera todos os usuários cadastrados no banco.
 * @returns {Promise<Array>} Retorna um array com todos os usuários.
 */
export async function recuperarUsuariosService() {
    const [rows] = await connection.query("SELECT * FROM Usuario");
    return rows;

}

/**
 * Recupera um usuário pelo seu ID.
 * @param {number} UsuarioId - ID do usuário a ser buscado.
 * @returns {Promise<Array>} Retorna um array com os dados do usuário.
 */
export async function recuperarUsuariosServiceById(UsuarioId) {
   const sql = `SELECT * FROM Usuario Where UsuarioId = ?`;
   const values = [UsuarioId];
   const [rows]  = await connection.query(sql, values);


   return rows ;

}

/**
 * Recupera um usuário pelo seu E-mail.
 * @param {number} UsuarioEmail - E-mail do usuário a ser buscado.
 * @returns {Promise<Array>} Retorna um array com os dados do usuário.
 */
export async function recuperarUsuarioServiceByEmail(UsuarioEmail) {
   const sql = `SELECT * FROM Usuario Where UsuarioEmail like ?`;
   const values = [UsuarioEmail];
   const [rows]  = await connection.query(sql, values);
   return rows ;

}

/**
 * Valida um usuário pelo login (e-mail) e senha.
 * @param {string} Login - E-mail do usuário.
 * @param {string} Senha - Senha de entrada para validação.
 * @returns {Promise<Object|null>} Retorna os dados do usuário sem a senha se válido, 
 *                                 ou null caso o login/senha estejam errados.
 */
export async function validaLoginByUsuario(Login,Senha) {
   const sql =`SELECT * FROM Usuario Where UsuarioEmail like ?`;
   const values = [Login];
   const [rows]  = await connection.query(sql, values);

  if (rows.length === 0) {
    return null; 
  }
 
  const usuario = rows[0];
  const isSenhaValida = await bcrypt.compare(Senha, usuario.UsuarioSenha);
  if(!isSenhaValida){
     return null;
  }
 
  usuario.UsuarioSenha = '';
  return usuario;
}


/**
 * Cria um novo usuário no banco de dados.
 * @param {Object} UsuarioData - Objeto com os dados do usuário.
 * @returns {Promise<number>} Retorna o ID do usuário inserido.
 */
export async function criarUsuarioService(UsuarioData) {

    const SenhaCriptografada = await criptografarSenha(UsuarioData.UsuarioSenha);
    const sql = `
    INSERT INTO Usuario (
        UsuarioNome,
        UsuarioLogin,
        UsuarioSenha,
        UsuarioEmail,
        UsuarioStatus
    )
    VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        UsuarioData.UsuarioNome,
        UsuarioData.UsuarioLogin,
        SenhaCriptografada,
        UsuarioData.UsuarioEmail,
        UsuarioData.UsuarioStatus
    ];

  const [result] = await connection.query(sql, values);
  return result.insertId;
}

/**
 * Atualiza os dados de um usuário existente.
 * @param {number} UsuarioId - ID do usuário a ser atualizado.
 * @param {Object} UsuarioData - Objeto com os dados atualizados do usuário.
 * @returns {Promise<Object>} Retorna o resultado da operação de atualização.
 */
export async function atualizarUsuarioService(UsuarioId,UsuarioData) {

  const SenhaCriptografada = await criptografarSenha(UsuarioData.UsuarioSenha);

  const sql = ` UPDATE Usuario SET UsuarioNome = ?, UsuarioLogin = ?,UsuarioSenha = ?, UsuarioEmail = ?, UsuarioStatus = ? WHERE UsuarioId = ?;`;

  const values = [
      UsuarioData.UsuarioNome,
      UsuarioData.UsuarioLogin,
      SenhaCriptografada,
      UsuarioData.UsuarioEmail,
      UsuarioData.UsuarioStatus,
      UsuarioId
  ];

  const [result] = await connection.query(sql, values);
  return result;
}


/**
 * Deleta um usuário pelo ID.
 * @param {number} UsuarioId - ID do usuário a ser deletado.
 * @returns {Promise<number>} Retorna a quantidade de linhas afetadas, caso retorne 0 quer dizer que não deletou nada.
 */
export async function deletarUsuarioServiceById(UsuarioId) {
  const sql = `DELETE FROM Usuario WHERE UsuarioId = ?;`;
  const values = [UsuarioId];

  try {
    const [result] = await connection.query(sql, values);
    return result.affectedRows;

  } catch (error) {
    console.error("Erro no query:", error);
    throw error;
  }
 

}