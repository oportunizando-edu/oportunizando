const express = require('express');
const router = express.Router();
const opportunitiesContoller = require('../controllers/opportunitiesController');

router.get('/', opportunitiesContoller.getOpportunitiesPage);

module.exports = router;