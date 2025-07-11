//Definição de constantes
const express = require('express');
const app = express();
const path = require('path');
const pool = require('./config/db');

//Usar o express com json
app.use(express.json());
const session = require('express-session');
require('dotenv').config();

//definindo sessão
app.use(session({
  secret: process.env.SESSION_SECRET,  
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));


//Definição da views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Definição do public
app.use(express.static(path.join(__dirname, 'public')));

//importando caminho das rotas principais
const userRoutes = require('./routes/userRoutes');
const interestsRoutes = require('./routes/interestsRoutes');
const landingPageRoutes = require('./routes/frontRoutes');

//Definindo rotas principais
app.use('/', userRoutes);
app.use('/', interestsRoutes);
app.use('/', landingPageRoutes);

//Criar rota para team
/* app.get('/team', (req, res) => {
  res.render('team')
}) */

//Usar o middleware de ler requisições de post
app.use(express.urlencoded({extended: true}))

//Usar o session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true em HTTPS
    maxAge: 24000 * 60 * 60 // 24 horas
  }
}));

//Rota do homeStudent
const homeStudentRoutes = require('./routes/homeStudentsRoutes');
app.use('/homeStudents', homeStudentRoutes);

//Rota de visualização
const opportunitiesByAreaRoutes = require('./routes/opportunitiesByAreaRoutes');
app.use('/opportunities', opportunitiesByAreaRoutes)

const opportunityRoutes = require('./routes/opportunityRoutes');
app.use('/opportunity', opportunityRoutes);

//Testar a conexão com o bd:
const db = require('./config/db');

(async () => {
  try {
    const client = await db.connect();
    const res = await client.query('SELECT NOW()');
    console.log('Conectado ao banco em:', res.rows[0].now);
    client.release();
  } catch (error) {
    console.error('Erro ao conectar no banco:', error);
    process.exit(1);
  }
})();


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