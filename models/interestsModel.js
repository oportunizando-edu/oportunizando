const pool = require('../config/db')

//mostrar areas de interesse dos estudantes - users_areas

//inserir areas de interesse user_areas
exports.selectAreas = async (user_id, area_ids) => {
    const values = area_ids.map(area_id => `(${user_id}, ${area_id})`).join(', ');
    const query = `INSERT INTO users_areas (user_id, area_id) VALUES ${values} RETURNING *`;
    const result = await pool.query(query);

    return result.rows;
};

//atualizarInteressesUsuario
exports.deleteArea = async (user_id, area_id) => {
    const result = await pool.query('DELETE FROM users_areas WHERE user_id = $1 AND area_id = $2 RETURNING *',    [user_id, area_id]
  );

  if (result.rowCount === 0) {
    throw new Error('Área de interesse não encontrada para esse usuário');
  }

  return result.rows[0];
};
/* 
//mostrar oportunidades baseadas nos interesses
exports.getOpportunitiesByUser = async (user_id) => {
  const result = await pool.query(`
    SELECT DISTINCT o.*
    FROM opportunities o
    JOIN opportunities_areas oa ON o.id = oa.opportunity_id
    JOIN users_areas ua ON ua.area_id = oa.area_id
    WHERE ua.user_id = $1 `, [user_id]);

  return result.rows;
};
 */