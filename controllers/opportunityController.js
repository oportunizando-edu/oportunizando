const opportunityModel = require('../models/opportunityModel');
//Renderizar a página de oportunidades
exports.getOpportunityPage = async(req, res) => {
    try{
        const isLogged = false //trocar depois por uma maneira de ver se tem alguém logado
        const opportunityId = req.params.id;

        const opportunity = await opportunityModel.getOpportunityById(opportunityId);

        res.render('opportunity', {
            isLogged,
            opportunity
        });
    } catch(err){
        res.status(500).json({ message: err.message });
    }

}
//Adicionar uma oportunidade a um usuário
exports.addOpportunityToStudent = async(req, res) => {
    try{
        const userId = 0;//trocar depois por uma maneira de acessar o id do usuário
        const opportunityId = req.params.id;

        const opportunityToStudent = await opportunityModel.addOpportunityToStudent(userId, opportunityId);
        res.status(200).json({ message: 'Oportunidade adicionada com sucesso', opportunityToStudent});

    } catch(err){
        res.status(500).json({ message: err.message })
    }
}