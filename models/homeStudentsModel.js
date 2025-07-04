//Chamar a pool de conexões 
const pool = require("../config/db");

//Modularizar as funções
module.exports = {
    //pegar as informações de acordo com o estudante logado
    async getAreasByStudentsId(id){
        const values = [id];
        const query = `SELECT areas.* FROM areas
                        JOIN users_areas ON areas.id = users_areas.area_id
                        WHERE users_areas.user_id = $1`;
        const result = await pool.query(query, values);
        //retornar todos os resultados em um array
        return result.rows;
    },

    //pegar todas as áreas
    async getAllAreas(){
        const query = `SELECT * FROM areas`;
        const result = await pool.query(query);
        //retornar todos os resultados em um array
        return result.rows;
    },   
    
    //pegar as áreas de acordo com o filtro
    async getAreasByTitle(data){
      const query = ` SELECT * FROM areas WHERE title ILIKE '%' || $1 || '%' `;
      const values = [data.title.trim()]; //evitar espaços 
      const result = await pool.query(query, values);
      return result.rows;
    }
}
