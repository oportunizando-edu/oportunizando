const { parse } = require('dotenv');
const opportunityModel = require('../models/opportunityModel');

exports.renderKanban = async (req, res) => {
  try {
    const userId = req.session.user?.user_id;
    
    if (!userId) {
      return res.redirect('/loginUser');
    }

    // Buscar oportunidades do usuário por estado
    const [aFazer, fazendo, feito] = await Promise.all([
      opportunityModel.getUserOpportunitiesByState(userId, 'a-fazer'),
      opportunityModel.getUserOpportunitiesByState(userId, 'fazendo'),
      opportunityModel.getUserOpportunitiesByState(userId, 'feito')
    ]);

    res.render('kanban', { 
      pageTitle: 'Kanban',
      aFazer,
      fazendo,
      feito,
      isLogged: !!req.session.user
    });
  } catch (error) {
    console.error('Erro ao carregar kanban:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ message: 'Erro ao carregar o kanban', error: error.message });
  }
};

// Atualizar estado de uma oportunidade
exports.updateOpportunityState = async (req, res) => {
  try {
    const userId = req.session.user?.user_id;
    const { opportunityId, newState } = req.body;
    const opportunitytNumberId = parseInt(opportunityId, 10);

    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const updated = await opportunityModel.updateOpportunityState(userId, opportunitytNumberId, newState);
    
    res.redirect('/kanban');
  } catch (error) {
    console.error('Erro ao atualizar estado:', error);
    res.status(500).json({ message: 'Erro ao atualizar estado da oportunidade' });
  }
};
