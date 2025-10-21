import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import usuarioRoutes from './routes/usuario.routes.js';
import clienteRoutes from './routes/cliente.routes.js';
import vendaRoutes from './routes/venda.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/usuario', usuarioRoutes); 
app.use('/cliente', clienteRoutes); 
app.use('/venda', vendaRoutes); 


app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});