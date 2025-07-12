const opportunityModel = require('../models/opportunityModel');
//Renderizar a página de oportunidades
exports.getOpportunityPage = async(req, res) => {
    try{
        const isLogged = !!req.session?.user
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
        const userId = req.session.user?.user_id;
        const opportunityId = req.params.id;

        if (!userId) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }

        const opportunityToStudent = await opportunityModel.addOpportunityToStudent(userId, opportunityId);
        
        // Redirecionar para o kanban após adicionar a oportunidade
        res.redirect('/kanban');

    } catch(err){
        console.error('Erro ao adicionar oportunidade:', err);
        res.status(500).json({ message: err.message })
    }
}