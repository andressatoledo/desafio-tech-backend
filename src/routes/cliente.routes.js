import express from 'express';
import  {recuperarClientes,recuperarClientesById,criarCliente,atualizarCliente,deletarCliente} from '../controllers/cliente.controller.js';

const router = express.Router();

router.get('/', recuperarClientes);
router.get('/:id', recuperarClientesById);
router.post('/', criarCliente);
router.put('/:id', atualizarCliente);
router.delete('/:id', deletarCliente);

export default router;

