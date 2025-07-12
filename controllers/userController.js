const userModel = require('../models/userModel');

//Criar novo usuário
exports.createUser = async(req, res)=>{
    const {name, email, password} = req.body;

    try{
        await userModel.createUser(name, email, password);
        res.status(201).redirect('/loginUser');
    }
    catch(err){
        res.status(400).render('createUser', {erro: err.message});
    }
};

//login user
exports.loginUser = async(req, res)=>{
    const {email, password} = req.body;

    try{
    const user = await userModel.loginUser(email);

    if(!user){
        return res.status(401).render('login', {erro: 'Usuário não encontrado'});
    }
    if(user.password !==password){
        return res.status(401).render('login', {erro: 'Senha incorreta'});
    }

    //SALVA A SESSÃO antes de redirecionar
    req.session.user = {
        user_id: user.id,
        nome: user.name,
        email: user.email,
        role: user.role,
        senha: user.password
    }
    console.log('sessão:', req.session);

    //verifica se o usuário ja escolheu áreas de interesse
    const redirectUser = await userModel.interestsExist(user.id);

    if(redirectUser.rows.length === 0){
    return res.redirect('/interests');
    }
    return res.redirect('/homeStudents');
    
    } catch (err) {
    res.status(500).render('login', { erro: err });
  }
}

//delete user
exports.deleteUser = async (req, res)=>{
    const {id} = req.body;
    try{
        deletedUser = await userModel.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.status(200).json({ mensagem: 'Usuário deletado com sucesso', user: deletedUser });

    }
    catch (err) {
    res.status(500).render('login', { erro: 'Erro interno do servidor' });
}
}

//logout
exports.logout = (req, res) => {
  // Destroi a sessão atual do usuário
  req.session.destroy(err => {
    if (err) {
      console.error('Erro ao encerrar sessão:', err);
      return res.status(500).json({ erro: 'Erro ao encerrar a sessão' });
    }

    // Limpa o cookie de sessão do navegador
    res.clearCookie('connect.sid'); 

    res.status(200).json({ mensagem: 'Logout realizado com sucesso' });
    res.redirect('/login');
  });
};
