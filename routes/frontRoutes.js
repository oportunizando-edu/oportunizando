const express = require('express');
const router = express.Router();

// Rota principal para a landing page
router.get('/', (req, res) => {
  res.render('landingPage', { pageTitle: 'Oportunizando' });
});

module.exports = router; 