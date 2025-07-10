const express = require('express');
const router = express.Router();


// Exemplo de rota de usuário (pode ser removida ou editada depois)
router.get('/landingPage', (req, res) => {
  res.send('Rotas de usuário funcionando!');
});

const userController = require('../controllers/userController');

//create user
router.post('/createUser', userController.createUser);

//login user
router.post('/loginUser', userController.loginUser);

//logout user
router.get('/logoutUser', userController.logout);

//delete user
router.delete('/deleteUser', userController.deleteUser);

//views - podem ser renderizadas dentro das funções do controller tambem
router.get('/createUser', (req, res) => {
    res.render('register', {erro: null})
});

router.get('/loginUser', (req, res) => {
    res.render('login', {erro: null} );
});

module.exports = router;

