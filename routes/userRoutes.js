const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//create user
router.post('/user/create', userController.createUser);

//login user
router.get('/user/login', userController.loginUser);

//logout user
router.get('/user/logout', userController.logout);

//delete user
router.delete('/user/delete', userController.deleteUser);

module.exports = router;
