# Bookstore API

## Descrição

Esta é a API de uma livraria, desenvolvida em Node.js, que permite o gerenciamento de livros e usuários (funcionários). O sistema permite que funcionários cadastrem livros e façam operações CRUD (Criar, Ler, Atualizar, Deletar) em livros. A autenticação é feita via tokens JWT para garantir que apenas usuários autorizados possam acessar determinadas rotas.

## Estrutura do Projeto

```bash
bookstore/
├── src/
│    ├── config/
│    │   └── database.js
│    ├── controllers/
│    │   ├── authController.js
│    │   ├── bookController.js
│    │   └── userController.js
│    ├── middleware/
│    │   ├── validators.js
│    │   └── authMiddleware.js
│    ├── models/
│    │   ├── book.js
│    │   └── user.js
│    └── routes/
│    │   ├── auth.js
│    │   ├── books.js
│    │   └── user.js
│    └── app.js
├── .env
├── package.json
└── README.md
```

## Tecnologias Utilizadas
- Node.js
- Express
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- Bcrypt
- Express Validator

## Configuração Inicial

#### 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/bookstore.git
cd bookstore
```

#### 2. Instale as dependências:

```bash
npm install
```

#### 3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=seu_segredo_jwt
```

#### 4. Inicie o servidor:

```bash
npm start
```
**Que a força esteja com você**
<img src="./docs/images/luke.png" alt="luke skywalker emoji" width="30" height="30">