const pool = require('../config/db');
//Pegar as informações da oportunidade
exports.getOpportunityById = async(id) => {
    const query = `SELECT * FROM opportunities WHERE id = $1`;
    const values = [id];

    const result = await pool.query(query, values);
    return result.rows[0];
};
//Adicionar uma oportunidade ao usuário
exports.addOpportunityToStudent = async(userId, opportunityId) => {
    const query = `INSERT INTO users_opportunities(user_id, opportunity_id)
                    VALUES ($1, $2)
                    RETURNING *;`; //criar a relação e retornar os valores
    const values = [userId, opportunityId];

    const result = await pool.query(query, values);
    return result.rows;
};