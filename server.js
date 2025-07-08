//Definição de constantes
const express = require('express');
const app = express();
const path = require('path');
const pool = require('./config/db');

//Usar o express com json
app.use(express.json());

//Definição da views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Definição do public
app.use(express.static(path.join(__dirname, 'public')));


//importando caminho das rotas principais
const userRoutes = require('./routes/userRoutes');

//Definindo rotas principais
app.get('/', userRoutes);

app.get('/team', (req, res) => {
  res.render('team')
})

//Porta para ser usada
const PORT = process.env.PORT || 3000;

//Verificar se a conexão foi realizada com sucesso
pool.connect()
  .then(client => {
    console.log('Conexão com o banco de dados realizada com sucesso');
    client.release();

    //Inciar após a conexão com o db
    app.listen( PORT, () =>{
      console.log("Servidor rodando na porta:", PORT);
    })
  })
  .catch(err => {
    console.error('Erro ao se conectar com o banco de dados: ', err);
    //encerrar o processo
    process.exit(1);
  });


module.exports = app;