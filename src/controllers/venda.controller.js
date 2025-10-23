import { recuperarVendasService, recuperarVendasServiceById, criarVendaService, atualizarVendaService, deletarVendaServiceById } from "../services/venda.service.js";

/**
 * Recupera todas as vendas cadastradas.
 * @param {Object} req - Objeto de requisição.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<Object>} Retorna um JSON com as vendas ou mensagem de erro.
 */
export async function recuperarVendas(req, res) {
  try {
    const vendaData = await recuperarVendasService();
    return res.status(200).json(vendaData);

  } catch (error) {

    return res.status(500).json({ error: `Falha ao recuperar os dados de venda: ${error.message}.` });
  }
}


/**
 * Recupera uma venda específica pelo ID.
 * @param {Object} req - Objeto de requisição, contendo o ID no params.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<Object>} Retorna um JSON com os dados da venda ou mensagem de erro.
 */
export async function recuperarVendasById(req, res) {
  try {
    const vendaByIdData = await recuperarVendasServiceById(req.params.id);
    return res.status(200).json(vendaByIdData);

  } catch (error) {

    return res.status(500).json({ error: `Falha ao recuperar os dados de venda por id: ${error.message}.` });
  }
}

/**
 * Cria uma nova venda.
 * @param {Object} req - Objeto de requisição, contendo os dados da venda no body.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<Object>} Retorna mensagem de sucesso e dados da venda criado ou mensagem de erro.
 */
export async function criarVenda(req, res) {
  try {
    const vendaNova = await criarVendaService(req.body);
    return res.status(201).json({ message: "Venda inserida com sucesso.", data: vendaNova });

  } catch (error) {

    return res.status(500).json({ error: `Falha ao criar venda: ${error.message}.` });
  }
}

/**
 * Atualiza os dados de uma venda existente pelo ID.
 * @param {Object} req - Objeto de requisição, contendo o ID no params e os dados atualizados no body.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<Object>} Retorna mensagem de sucesso e dados atualizados ou mensagem de erro.
 */
export async function atualizarVenda(req, res) {
  try {

    const vendaAtualizada = await atualizarVendaService(req.params.id, req.body);
    return res.status(200).json({ message: "Venda atualizada com sucesso.", data: vendaAtualizada });

  } catch (error) {

    return res.status(500).json({ error: `Falha ao atualizar venda: ${error.message}.` });
  }
}


/**
 * Deleta uma venda pelo ID.
 * @param {Object} req - Objeto de requisição, contendo o ID no params.
 * @param {Object} res - Objeto de resposta.
 * @returns {Promise<Object>} Retorna mensagem de sucesso se deletado, 404 se não encontrado ou mensagem de erro.
 */
export async function deletarVenda(req, res) {
  try {
    const hasAffectedRows = await deletarVendaServiceById(req.params.id);
       
    if(hasAffectedRows > 0){
      return res.status(200).json({ message: "Venda deletada com sucesso."});
      
    }else{
      return res.status(404).json({ message: "Não foi possível encontrar venda."});
    }
   
  } catch (error) {

    return res.status(500).json({ error: `Falha ao deletar os dados de venda: ${error.message}.` });
  }
}