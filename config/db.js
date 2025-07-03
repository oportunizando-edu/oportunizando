const { Pool } = require('pg');
require('dotenv').config();

const isSSL = process.env.DB_SSL === 'true';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: isSSL ? { rejectUnauthorized: false } : false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect(),
};

//Verificar se a conexão foi realizada com sucesso
pool.connect()
  .then(client => {
    console.log('Conexão com o banco de dados realizada com sucesso');
    client.release();
  })
  .catch(err => {
    console.error('Erro ao se conectar com o banco de dados: ', err);
  });