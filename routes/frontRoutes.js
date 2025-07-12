const express = require('express');
const router = express.Router();
const kanbanController = require('../controllers/kanbanController');

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

// Nova rota para o kanban
router.get('/kanban', kanbanController.renderKanban);
router.post('/kanban/update-state', kanbanController.updateOpportunityState);

router.get('/students', (req, res) => {
  res.render('students');
});

router.get('/institutions', (req, res) => {
  res.render('institutions')
});

router.get('/profile', (req, res) => {
  res.render('profile', {
        user: user.id,
        nome: user.name,
        email: user.email,
        senha: user.password
    })
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