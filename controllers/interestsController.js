const interestsModel = require('../models/interestsModel');

//selecionar areas de interesse
exports.selectAreas = async (req, res) => {
    const user_id = req.session.user?.user_id; //pega da sessão
    const { area_ids } = req.body;

  if (!user_id || !Array.isArray(area_ids) || area_ids.length === 0) {
    return res.status(400).json({ erro: 'Usuário não autenticado ou áreas inválidas' });
  }

  try {
    const result = await interestsModel.selectAreas(user_id, area_ids);
     res.redirect('/opportunities');
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

// mostrar a tela de seleção de interesses
exports.renderSelectAreas = async (req, res) => {
  try {
    const areas = await interestsModel.getAll();
    console.log('Áreas retornadas do banco:', areas);

    res.render('interests', { areas });
  } catch (err) {
    res.status(500).send('Erro ao carregar áreas de interesse');
  }
};

exports.deleteArea = async (req, res) => {
  try {
    const user_id = req.session.user?.id; // pega da sessão
    const { area_id } = req.body;

    if (!user_id) {
      return res.status(401).json({ erro: 'Usuário não autenticado' });
    }

    if (!area_id) {
      return res.status(400).json({ erro: 'area_id é obrigatório' });
    }

    const deletedArea = await interestsModel.deleteArea(user_id, area_id);

    return res.status(200).json({message: 'Área de interesse removida com sucesso'});

    } 
    catch (err) {
    return res.status(400).json({ erro: err.message });
  }
};

/* 
exports.getOpportunitiesByUser = async (req, res) => {
  try {
    const user_id = req.session.user?.id;

    if (!user_id) {
      return res.status(401).json({ erro: 'Usuário não autenticado' });
    }

    const opportunities = await interestsModel.getOpportunitiesByUser(user_id);

    return res.status(200).json({
      message: 'Oportunidades com base nos seus interesses',
      data: opportunities
    });

  } catch (err) {
    console.error('Erro ao buscar oportunidades:', err);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

 */