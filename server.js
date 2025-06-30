//Definição de constantes
const express = require('express');
const app = express();
const path = require('path');

//Definição da views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Definição do public
app.use(express.static(path.join(__dirname, 'public')));

//Porta para ser usada
const PORT = process.env.PORT || 3000;

//Avisar que está funcionando
app.listen( PORT, () =>{
  console.log("Servidor rodando na porta:", PORT);
})

module.exports = app;