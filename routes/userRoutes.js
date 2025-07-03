const express = require('express');
const router = express.Router();

// Exemplo de rota de usuário (pode ser removida ou editada depois)
router.get('/', (req, res) => {
  res.send('Rotas de usuário funcionando!');
});

module.exports = router; 