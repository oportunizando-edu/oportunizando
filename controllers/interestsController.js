const interestsModel = require('../models/interestsModel');

//selecionar areas de interesse
exports.selectAreas = async (req, res) => {
    const user_id = req.session.user_id; //pega da sessão
    const { area_ids } = req.body;

  if (!user_id || !Array.isArray(area_ids) || area_ids.length === 0) {
    return res.status(400).json({ erro: 'user_id e area_ids (array) são obrigatórios' });
  }

  try {
    const result = await interestsModel.selectAreas(user_id, area_ids);
    return res.status(201).json({
      message: 'Áreas de interesse inseridas com sucesso',
      data: result
    });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

