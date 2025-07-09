const express = require('express');
const router = express.Router();
const oppController = require('../controllers/interestsController');

//selecionar interesses
router.post('/interests', oppController.selectAreas);

/* //mostrar oportunidades baseadas nos interesses
router.get('/myOpportunities', oppController.getOpportunitiesByUser);
 */
//apagar area de interesse
router.delete('/interests', oppController.deleteArea);

module.exports = router;