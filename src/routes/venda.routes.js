import express from 'express';
import  {recuperarVendas,recuperarVendasById,criarVenda,atualizarVenda,deletarVenda} from '../controllers/venda.controller.js';
//,recuperarVendaById,criarVenda,atualizarVenda,deletarVenda
const router = express.Router();

router.get('/', recuperarVendas);
router.get('/:id', recuperarVendasById);
router.post('/', criarVenda);
router.put('/:id',atualizarVenda);
router.delete('/:id', deletarVenda);

export default router;
