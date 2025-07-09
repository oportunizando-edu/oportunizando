const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//create user
router.post('/createUser', userController.createUser);

//login user
router.get('/loginUser', userController.loginUser);

//logout user
router.get('/logoutUser', userController.logout);

//delete user
router.delete('/deleteUser', userController.deleteUser);

//views - podem ser renderizadas dentro das funções do controller tambem
router.get('createUser', (req, res) => {
    res.render('register')
});

/* router.get('loginUser', (req, res) => {
    res.render('login')
}); */

module.exports = router;
