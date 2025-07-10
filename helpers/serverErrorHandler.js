module.exports = {
  // Simula uma verificação de conexão com o banco (sempre retorna true)
  databaseConnectionHandler: async () => {
    return true;
  },

  // Middleware para rotas não encontradas
  notFoundHandler: (req, res, next) => {
    res.status(404).send('Página não encontrada');
  },

  // Middleware para erros globais
  globalErrorHandler: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erro interno do servidor');
  }
}; 