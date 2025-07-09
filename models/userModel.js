const pool = require('../config/db');

//Criar novo usuário
exports.createUser = async(name, email, password) => {

    const existUser = await pool.query ('SELECT * FROM users WHERE email = $1' , [email]);

    if(existUser.rows.length > 0){
        throw new Error('Email já cadastrado') //para a execução e envia essa msg de error
    }

    //inserindo usuário, caso não exista
    const result = await pool.query ('INSERT INTO users (name, email, password) values ($1, $2, $3) RETURNING*', [name, email, password]);

    return result.rows[0];
    
}

//Login user
exports.loginUser = async (email)=>{

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    return result.rows[0]; 

}

//delete user
exports.deleteUser = async(id)=>{
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    
    if (result.rowCount === 0) { //erro se nenhuma linha for afetada no banco
      throw new Error('Usuário não encontrado');
    }

    return result.rows[0];
}