import { recuperarClientesService,recuperarClientesServiceById,criarClienteService,atualizarClienteService,deletarClienteServiceById} from "../services/cliente.service.js";



/**
 * Recupera todos os clientes cadastrados.
 * @param {Object} req - Objeto de requisição.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<Object>} Retorna um JSON com os clientes ou mensagem de erro.
 */
export async function recuperarClientes(req, res) {
  try {
    const clienteData = await recuperarClientesService();
    return res.status(200).json(clienteData);

  } catch (error) {
    return res.status(500).json({ error: `Falha ao recuperar os dados de cliente: ${error.message}`});
  }
}

/**
 * Recupera um cliente específico pelo ID.
 * @param {Object} req - Objeto de requisição, contendo o ID no params.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<Object>} Retorna um JSON com os dados do cliente ou mensagem de erro.
 */
export async function recuperarClientesById(req, res) {
  try {
    const clienteByIdData = await recuperarClientesServiceById(req.params.id);
    return res.status(200).json(clienteByIdData);

  } catch (error) {
    return res.status(500).json({error: `Falha ao recuperar os dados de cliente por id: ${error.message}`});
  }
}

/**
 * Cria um novo cliente.
 * @param {Object} req - Objeto de requisição, contendo os dados do cliente no body.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<Object>} Retorna mensagem de sucesso e dados do cliente criado ou mensagem de erro.
 */
export async function criarCliente(req, res) {

  try {
    const clienteNovo = await criarClienteService(req.body);
    return res.status(201).json({ message: "Cliente inserido com sucesso.", data:clienteNovo});

  } catch (error) {
   
    return res.status(500).json({ error: `Falha ao criar cliente: ${error.message}.`});
  }
}

/**
 * Atualiza os dados de um cliente existente pelo ID.
 * @param {Object} req - Objeto de requisição, contendo o ID no params e os dados atualizados no body.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<Object>} Retorna mensagem de sucesso e dados atualizados ou mensagem de erro.
 */
export async function atualizarCliente(req, res) {
  try {
    const clienteAtualizado = await atualizarClienteService(req.params.id,req.body);
    return res.status(200).json({ message: "Cliente atualizado com sucesso.", data:clienteAtualizado});

  } catch (error) {
    return res.status(500).json({error: `Falha ao atualizar cliente: ${error.message}.`});
  }
}

/**
 * Deleta um cliente pelo ID.
 * @param {Object} req - Objeto de requisição, contendo o ID no params.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<Object>} Retorna mensagem de sucesso se deletado, 404 se não encontrado ou mensagem de erro.
 */
export async function deletarCliente(req, res) {
  try {
    const hasAffectedRows = await deletarClienteServiceById(req.params.id);

    if(hasAffectedRows > 0){
      return res.status(200).json({ message: "Cliente deletado com sucesso."});
      
    }else{
      return res.status(404).json({ message: "Não foi possível encontrar cliente."});
    }
    

  } catch (error) {
    return res.status(500).json({error: `Falha ao deletar dados do cliente: ${error.message}.`});
  }
}                  