import express from 'express';
import  {recuperarUsuarios,recuperarUsuarioById,validaLogin,recuperarUsuariosByEmail,criarUsuario,atualizarUsuario,deletarUsuario} from '../controllers/usuario.controller.js';

const router = express.Router();

router.get('/',recuperarUsuarios);
router.get('/:id',recuperarUsuarioById);
router.post('/login',validaLogin);
router.get('/login/:email',recuperarUsuariosByEmail);
router.post('/',criarUsuario);
router.put('/:id',atualizarUsuario);
router.delete('/:id',deletarUsuario);

export default router;
