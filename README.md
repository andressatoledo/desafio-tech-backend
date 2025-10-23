# Sistema de Gestão de Usuários, Clientes e Vendas

## Descrição do Projeto

Este projeto consiste em uma aplicação web que permite:  

- Autenticação de usuários (login tradicional por email e senha).  
- CRUD de usuários (criar, listar, atualizar e excluir).  
- CRUD de clientes (criar, listar, atualizar e excluir).  
- CRUD de vendas, com cada venda vinculada a um cliente.

O objetivo é demonstrar uma arquitetura em camadas, com frontend, backend e banco de dados bem estruturados, utilizando **Node.js, Express e MySQL**.

---

## Estrutura da Comunicação Frontend → Backend → Banco de Dados

O sistema é organizado em **três camadas principais**:

### 1️⃣ Frontend
- Desenvolvido com **HTML, CSS e JavaScript**.  
- Responsável por apresentar informações ao usuário de forma clara e intuitiva.  
- Permite **criar, ler, atualizar e deletar** dados via requisições HTTP (GET, POST, PUT, DELETE) em formato JSON.  
- Toda interação do usuário passa por essa camada, que se comunica diretamente com o backend.

### 2️⃣ Backend
- Desenvolvido com **Node.js e Express**.  
- Recebe requisições do frontend e realiza:  
  - **Validação de login**, comparando senhas criptografadas armazenadas no banco.  
  - **Geração de tokens JWT** para controlar acesso às rotas protegidas.  
  - **Processamento da lógica de negócio**, como criação, atualização, recuperação e exclusão de dados.  
- Retorna respostas ao frontend indicando sucesso ou falha em cada operação.

### 3️⃣ Banco de Dados
- Implementado em **MySQL**.  
- Armazena informações de usuários, clientes e vendas.  
- A comunicação com o backend é feita via **queries parametrizadas**, utilizando **pool de conexão**.  
- Permite que o backend execute operações de forma confiável e organizada.

---

## Fluxo Geral da Comunicação

1. O **frontend** envia uma requisição HTTP com os dados necessários.  
2. O **backend** processa a requisição, valida informações e executa operações no banco de dados quando necessário.  
3. O **banco de dados** retorna o resultado da operação (dados ou confirmação de sucesso).  
4. O **backend** envia a resposta ao frontend, que atualiza a interface para o usuário.

---

## Tecnologias Utilizadas

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express  
- **Banco de Dados:** MySQL  
- **Autenticação:** JWT, bcrypt  
