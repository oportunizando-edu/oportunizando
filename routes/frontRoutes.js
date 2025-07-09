const express = require('express');
const router = express.Router();

// Rota principal para a landing page
router.get('/', (req, res) => {
  res.render('landingPage', { pageTitle: 'Oportunizando' });
});

router.get('/team', (req, res) => {
  res.render('team');
});

module.exports = router; 