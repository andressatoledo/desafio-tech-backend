import { recuperarUsuariosService,recuperarUsuariosServiceById,recuperarUsuarioServiceByEmail,validaLoginByUsuario,criarUsuarioService,atualizarUsuarioService,deletarUsuarioServiceById} from "../services/usuario.service.js";
import { gerarToken } from "../utils/gerarToken.js";


/**
 * Recupera todos os usuários cadastrados.
 * @param {Object} req - Objeto de requisição.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<Object>} Retorna um JSON com os usuários ou mensagem de erro.
 */
export async function recuperarUsuarios(req, res) {
  try {
    const usuarioData = await recuperarUsuariosService();
    console.log(usuarioData);
    return res.status(200).json(usuarioData);
  } catch (error) {

    return res.status(500).json({error: `Falha ao recuperar os dados de usuário: ${error.message}.`});
  }
}

/**
 * Recupera um usuário específico pelo ID.
 * @param {Object} req - Objeto de requisição, contendo o ID no params.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<Object>} Retorna um JSON com os dados do usuário ou mensagem de erro.
 */
export async function recuperarUsuarioById(req, res) {
  try {
    const usuarioByIdData = await recuperarUsuariosServiceById(req.params.id);

    return res.status(200).json(usuarioByIdData);

  } catch (error) {

    return res.status(500).json({ error: `Falha ao recuperar os dados de usuário por id: ${error.message}.` });
  }
}

/**
 * Recupera um cliente específico pelo E-mail.
 * @param {Object} req - Objeto de requisição, contendo o E-mail no params.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<Object>} Retorna um JSON com os dados do usuário ou mensagem de erro.
 */
export async function recuperarUsuariosByEmail(req, res) {
  try {
    const usuarioByEmailData = await recuperarUsuarioServiceByEmail(req.params.email);
    return res.status(200).json(usuarioByEmailData);

  } catch (error) {

    return res.status(500).json({ error: `Falha ao recuperar os dados de usuário por id: ${error.message}.` });
  }
}

/**
 * Valida o login de um usuário.
 * @param {Object} req - Objeto de requisição, contendo login(e-mail) e senha no body.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<Object>} Retorna um JSON com token e dados do usuário (sem a senha) se o login for válido, 
 *                            ou mensagem de erro caso login seja inválido.
 */
export async function validaLogin(req, res) {
  try {

    const {login,senha} = req.body;
    const usuarioByLoginData = await validaLoginByUsuario(login,senha);
    if(!usuarioByLoginData){
      return res.status(401).json({ error: "Login ou senha incorretos." });
    }

    const token = await gerarToken(usuarioByLoginData.UsuarioId,usuarioByLoginData.UsuarioEmail)
    return res.status(200).json({error:'Login realizado com sucesso.',token:token,usuario:usuarioByLoginData});

  } catch (error) {

    return res.status(500).json({error: `Falha ao recuperar os dados de usuário por login: ${error.message}.`});
  }
}


/**
 * Cria um novo usuário.
 * @param {Object} req - Objeto de requisição, contendo os dados do usuário no body.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<Object>} Retorna mensagem de sucesso e dados do usuário criado ou mensagem de erro.
 */
export async function criarUsuario(req, res) {

  try {
    const usuarioNovo = await criarUsuarioService(req.body);
    return res.status(201).json({ message: "Usuário inserido com sucesso.",data:usuarioNovo});

  } catch (error) {
   
    return res.status(500).json({ error: `Falha ao criar usuário: ${error.message}.`});
  }
}

/**
 * Atualiza os dados de um usuário existente pelo ID.
 * @param {Object} req - Objeto de requisição, contendo o ID no params e os dados atualizados no body.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<Object>} Retorna mensagem de sucesso e dados atualizados ou mensagem de erro.
 */
export async function atualizarUsuario(req, res) {

  try {
   
    const usuarioAtualizado = await atualizarUsuarioService(req.params.id,req.body);
     return res.status(200).json({ message: "Usuário atualizado com sucesso.",data: usuarioAtualizado});

  } catch (error) {
    
    return res.status(500).json({error: `Falha ao atualizar usuário: ${error.message}.`});
  }
}

/**
 * Deleta um usuário pelo ID.
 * @param {Object} req - Objeto de requisição, contendo o ID no params.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<Object>} Retorna mensagem de sucesso se deletado, 404 se não encontrado ou mensagem de erro.
 */
export async function deletarUsuario(req, res) {
  try {
    const hasAffectedRows = await deletarUsuarioServiceById(req.params.id);
       
    if(hasAffectedRows > 0){
      return res.status(200).json({ message: "Usuário deletado com sucesso."});
      
    }else{
      return res.status(404).json({ message: "Não foi possível encontrar usuário."});
    }
   
  } catch (error) {

    return res.status(500).json({error: `Falha ao deletar os dados de usuário: ${error.message}.`});
  }
}