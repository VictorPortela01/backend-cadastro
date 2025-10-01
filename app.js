require('dotenv').config()

const express = require('express')

const cors = require('cors')

const port = process.env.PORT

const app = express()

// config JSON and form data response
app.use(express.json())
app.use(express.urlencoded(({ extended: false })))

// --- CONFIGURAÇÃO DE CORS RECOMENDADA ---

// 1. Crie uma lista de origens permitidas
const allowedOrigins = [
  'http://localhost:3000',      // Sua origem de desenvolvimento local
  process.env.FRONTEND_URL     // A URL do seu frontend em produção (que você vai configurar no Railway)
];

// 2. Crie as opções do CORS
const corsOptions = {
  origin: (origin, callback) => {
    // A origem da requisição (ex: https://meu-app.vercel.app)
    // Se a origem estiver na sua lista de permissões, ou se a requisição não tiver origem
    // (como em uma requisição do Postman/Insomnia ou de servidor para servidor), permita.
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Acesso não permitido por CORS'));
    }
  },
  credentials: true // Essencial para enviar cookies ou cabeçalhos de autorização
};

// 3. Aplique o middleware do CORS com as opções
app.use(cors(corsOptions));

// DB connection 
require('./config/db.js')

// routes
const router = require('./routes/Router.js')
app.use(router);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})