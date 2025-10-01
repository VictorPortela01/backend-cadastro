# 🚀 API com Node.js, Express e MongoDB

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)\
![Express](https://img.shields.io/badge/Express-4.x-blue?logo=express)\
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen?logo=mongodb)\
![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens)

------------------------------------------------------------------------

## 📌 Sobre o Projeto

API desenvolvida em **Node.js + Express + MongoDB** com autenticação via
**JWT**, validações usando **express-validator** e arquitetura
organizada em **controllers, models, routes e middlewares**.

------------------------------------------------------------------------

## ⚙️ Dependências

### 📦 Produção

-   **bcryptjs** → criptografia de senhas.\
-   **cors** → controle de origens.\
-   **dotenv** → variáveis de ambiente.\
-   **express** → framework web.\
-   **express-validator** → middleware de validação.\
-   **jsonwebtoken** → autenticação.\
-   **mongoose** → ODM para MongoDB.

### 🔧 Desenvolvimento

-   **nodemon** → auto-restart do servidor em dev.

------------------------------------------------------------------------

## 📥 Instalação

``` bash
git clone <url-do-repo>
cd <nome-do-projeto>

# Instalar dependências principais
npm install

# Instalar nodemon (dev)
npm install --save-dev nodemon
```

------------------------------------------------------------------------

## ⚡ Scripts

No `package.json`:

``` json
"scripts": {
  "server": "nodemon ./app.js"
}
```

Rodar servidor:

``` bash
npm run server
```

------------------------------------------------------------------------

## 📂 Estrutura de Pastas

    📦 projeto
     ┣ 📂 config
     ┃ ┗ 📜 db.js
     ┣ 📂 controllers
     ┃ ┗ 📜 UserController.js
     ┣ 📂 middlewares
     ┃ ┣ 📜 authGuard.js
     ┃ ┣ 📜 handleValidation.js
     ┃ ┗ 📜 userValidations.js
     ┣ 📂 models
     ┃ ┗ 📜 User.js
     ┣ 📂 routes
     ┃ ┣ 📜 Router.js
     ┃ ┗ 📜 UserRoutes.js
     ┣ 📜 app.js
     ┣ 📜 .env
     ┗ 📜 package.json

------------------------------------------------------------------------

## 🔑 Variáveis de Ambiente

Crie `.env` na raiz:

``` env
PORT=5000
DB_USER=seu_usuario_mongo
DB_PASSWORD=sua_senha_mongo
JWT_SECRET=sua_chave_secreta
```

------------------------------------------------------------------------

## 📌 Endpoints da API

### 👤 Usuários

#### **Registro**

`POST /api/users/register`

**Request:**

``` json
{
  "name": "Victor",
  "email": "victor@email.com",
  "password": "123456",
  "confirmpassword": "123456",
  "phone": "11999999999",
  "cpf": "12345678909"
}
```

**Response:**

``` json
{
  "_id": "64c2f7d1e4a8b6a9f7e11234",
  "token": "jwt_token_aqui"
}
```

------------------------------------------------------------------------

#### **Login**

`POST /api/users/login`

**Request:**

``` json
{
  "email": "victor@email.com",
  "password": "123456"
}
```

**Response:**

``` json
{
  "_id": "64c2f7d1e4a8b6a9f7e11234",
  "token": "jwt_token_aqui"
}
```

------------------------------------------------------------------------

#### **Perfil (Protegido)**

`GET /api/users/profile`\
🔒 Necessário enviar **Authorization: Bearer `<token>`{=html}**

**Response:**

``` json
{
  "_id": "64c2f7d1e4a8b6a9f7e11234",
  "name": "Victor",
  "email": "victor@email.com",
  "phone": "11999999999",
  "cpf": "12345678909",
  "createdAt": "2025-09-30T12:34:56.789Z"
}
```

------------------------------------------------------------------------

## 🛠️ Tecnologias Utilizadas

-   Node.js\
-   Express\
-   MongoDB (Atlas)\
-   Mongoose\
-   JWT (Json Web Token)\
-   Express Validator
