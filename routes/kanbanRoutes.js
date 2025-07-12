const express = require('express');
const router = express.Router();
const kanbanController = require('../controllers/kanbanController');

router.get('/', kanbanController.renderKanban);
router.post('/', kanbanController.updateOpportunityState);

module.exports = router;