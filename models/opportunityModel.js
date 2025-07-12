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
    try {
        // Primeiro, verificar se já existe
        const checkQuery = `SELECT * FROM users_opportunities WHERE user_id = $1 AND opportunity_id = $2`;
        const checkResult = await pool.query(checkQuery, [userId, opportunityId]);
        
        if (checkResult.rows.length > 0) {
            // Se já existe, atualizar o estado
            const updateQuery = `UPDATE users_opportunities SET state = 'a-fazer' WHERE user_id = $1 AND opportunity_id = $2 RETURNING *`;
            const updateResult = await pool.query(updateQuery, [userId, opportunityId]);
            return updateResult.rows;
        } else {
            // Se não existe, inserir novo
            const insertQuery = `INSERT INTO users_opportunities(user_id, opportunity_id, state) VALUES ($1, $2, 'a-fazer') RETURNING *`;
            const insertResult = await pool.query(insertQuery, [userId, opportunityId]);
            return insertResult.rows;
        }
    } catch (error) {
        console.error('Erro ao adicionar oportunidade:', error);
        throw error;
    }
};

//Buscar oportunidades do usuário por estado
exports.getUserOpportunitiesByState = async(userId, state) => {
    const query = `SELECT o.*, uo.state, uo.id as user_opportunity_id
                   FROM opportunities o
                   JOIN users_opportunities uo ON o.id = uo.opportunity_id
                   WHERE uo.user_id = $1 AND uo.state = $2
                   ORDER BY uo.id DESC`;
    const values = [userId, state];

    const result = await pool.query(query, values);
    return result.rows;
};

//Atualizar estado de uma oportunidade do usuário
exports.updateOpportunityState = async(userId, opportunityId, newState) => {
    const query = `UPDATE users_opportunities 
                   SET state = $3
                   WHERE user_id = $1 AND opportunity_id = $2
                   RETURNING *`;
    const values = [userId, opportunityId, newState];

    const result = await pool.query(query, values);
    return result.rows[0];
};