const express = require('express');
const router = express.Router();
const path = require('path');
const homeStudentsController = require('../controllers/homeStudentsController')

router.get('/', homeStudentsController.getHomePage);
router.post('/', homeStudentsController.searchByTitle);


module.exports = router;
