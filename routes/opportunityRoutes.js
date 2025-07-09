const express = require('express');
const router = express.Router();
const opportunityController = require('../controllers/opportunityController');

router.get('/:id', opportunityController.getOpportunityPage);
router.post('/:userId', opportunityController.addOpportunityToStudent);

module.exports = router;