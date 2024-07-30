# Bookstore API

## Descrição

Esta é a API de uma livraria, desenvolvida em Node.js, que permite o gerenciamento de livros e usuários (funcionários). O sistema permite que funcionários cadastrem livros e façam operações CRUD (Criar, Ler, Atualizar, Deletar) em livros. A autenticação é feita via tokens JWT para garantir que apenas usuários autorizados possam acessar determinadas rotas.

## Estrutura do Projeto

```bash
bookstore/
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── userController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── book.js
│   └── user.js
├── routes/
│   ├── auth.js
│   ├── books.js
│   └── user.js
├── .env
├── app.js
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

