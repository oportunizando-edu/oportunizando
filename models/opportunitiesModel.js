const pool = require('../config/db');

module.exports = {
    async getOpportunitiesByArea(id){
        const query= `SELECT opportunities.* FROM opportunities
                        JOIN opportunities_areas ON opportunities.id = opportunities_areas.opportunity_id
                        WHERE opportunities_areas.area_id = $1`;
        const values=[id];

        const result = await pool.query(query, values);
        return result.rows;
    }
}