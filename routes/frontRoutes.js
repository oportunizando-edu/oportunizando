const express = require('express');
const router = express.Router();

// Rota principal para a landing page
router.get('/', (req, res) => {
  res.render('landingPage', { pageTitle: 'Oportunizando' });
});

router.get('/team', (req, res) => {
  res.render('team');
});

router.get('/opportunities', (req, res) => {
  res.render('opportunities');
});

router.get('/students', (req, res) => {
  res.render('students');
});

router.get('/institutions', (req, res) => {
  res.render('institutions')
});

//rota para profile
router.get('/profile', (req, res) => {
  const user = req.session.user;

  if(!user){
    res.redirect('/loginUser');
  }

  res.render('profile', {
    user: user.user_id,
    nome: user.nome,
    email: user.email,
    senha: user.senha 
  });
});



// Rota para "Conheça nossos talentos" - redireciona para a seção de histórias de sucesso
router.get('/talentos', (req, res) => {
  res.redirect('/#historias-sucesso');
});

// Rota para "Contato" - redireciona para o footer
router.get('/contato', (req, res) => {
  res.redirect('/#contato');
});

module.exports = router; 