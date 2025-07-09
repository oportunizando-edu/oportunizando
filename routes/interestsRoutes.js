const express = require('express');
const router = express.Router();
const interestsController = require('../controllers/interestsController');

// RExibir tela (areas)
router.get('/interestsAll', interestsController.renderSelectAreas);

//selecionar interesses
router.post('/interests', interestsController.selectAreas);

/* //mostrar oportunidades baseadas nos interesses
router.get('/myOpportunities', interestsController.getOpportunitiesByUser);
 */
//apagar area de interesse
router.delete('/interests', interestsController.deleteArea);

//views
router.get('/interestsAll', (req, res) =>{
    res.render('interests');
});

module.exports = router;