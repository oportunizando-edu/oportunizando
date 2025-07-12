const pool = require('./config/db');

async function testDatabase() {
  try {
    console.log('Testando conexão com o banco...');
    
    // Testar conexão
    const client = await pool.connect();
    console.log('✅ Conexão com banco estabelecida');
    
    // Verificar se a tabela users existe
    const usersResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);
    console.log('Tabela users existe:', usersResult.rows[0].exists);
    
    // Verificar se a tabela opportunities existe
    const opportunitiesResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'opportunities'
      );
    `);
    console.log('Tabela opportunities existe:', opportunitiesResult.rows[0].exists);
    
    // Verificar se a tabela users_opportunities existe
    const usersOpportunitiesResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users_opportunities'
      );
    `);
    console.log('Tabela users_opportunities existe:', usersOpportunitiesResult.rows[0].exists);
    
    // Testar query do kanban
    const testQuery = `
      SELECT o.*, uo.state, uo.id as user_opportunity_id
      FROM opportunities o
      JOIN users_opportunities uo ON o.id = uo.opportunity_id
      WHERE uo.user_id = $1 AND uo.state = $2
      ORDER BY uo.created_at DESC
    `;
    
    // Usar um UUID de exemplo (primeiro usuário da tabela)
    const userResult = await client.query('SELECT id FROM users LIMIT 1');
    if (userResult.rows.length > 0) {
      const userId = userResult.rows[0].id;
      console.log('Testando query com userId:', userId);
      
      const kanbanResult = await client.query(testQuery, [userId, 'a-fazer']);
      console.log('✅ Query do kanban funcionou, encontrou', kanbanResult.rows.length, 'registros');
    } else {
      console.log('❌ Nenhum usuário encontrado na tabela users');
    }
    
    client.release();
    console.log('✅ Teste concluído com sucesso');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await pool.end();
  }
}

testDatabase(); 