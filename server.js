//Definição de constantes
const express = require('express');
const app = express();
const path = require('path');

//Definição da views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Definição do public
app.use(express.static(path.join(__dirname, 'public')));

//Usar o express
app.use(express.json());

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

//Avisar que está funcionando
app.listen( PORT, () =>{
  console.log("Servidor rodando na porta:", PORT);
})

module.exports = app;