import connection from "../models/connection.js"; 
import bcrypt from "bcrypt";
import {criptografarSenha} from "../utils/criptografarSenha.js";


export async function recuperarUsuariosService() {
    const [rows] = await connection.query("SELECT * FROM Usuario");
    return rows;

}

export async function recuperarUsuariosServiceById(UsuarioId) {
   const sql = `SELECT * FROM Usuario Where UsuarioId = ?`;
   const values = [UsuarioId];
   const [rows]  = await connection.query(sql, values);


   return rows ;

}

export async function recuperarUsuarioServiceByEmail(UsuarioEmail) {
   const sql = `SELECT * FROM Usuario Where UsuarioEmail like ?`;
   const values = [UsuarioEmail];
   const [rows]  = await connection.query(sql, values);
   return rows ;

}


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


export async function deletarUsuarioServiceById(UsuarioId) {
  const sql = `DELETE FROM Usuario WHERE UsuarioId = ?;`;
  const values = [UsuarioId];
  // const [result] = await connection.query(sql, values);
  try {
    const [result] = await connection.query(sql, values);
    console.log("result:", result);
    return result.affectedRows;
  } catch (error) {
    console.error("Erro no query:", error);
    throw error;
  }
  console.log('result',result);
  return result.affectedRows;

}