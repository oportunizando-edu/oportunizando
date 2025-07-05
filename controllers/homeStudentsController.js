const homeStudentsModel = require('../models/homeStudentsModel');

module.exports = {
    //Áreas de acordo com o id do estudante com uma condicional caso não tenha nenhum selecionado
    async getAreasByStudentsId(req,res){
        try{
            const userId = req.session.user?.id //depois alterar com a maneira correta de conseguir o id do usuário
            const areas = await homeStudentsModel.getAreasByStudentsId(userId);

            if(areas.length === 0){
                return res.status(200).render('homeStudents', {
                    message: 'Nenhuma área selecionada', 
                    areasByStudent: []
                });
            }

            res.status(200).render('homeStudents', {
                areasByStudent: areas
            });

        } catch(err) {
            res.status(500).json({ message: err.message });        
        }
    },

    //Todas as áreas
    async getAllAreas(req, res){
        try{
            const areas = await homeStudentsModel.getAllAreas();
            res.status(200).render('homeStudents', {
                areas: areas
            });

        } catch(err){
            res.status(500).json({ message: err.message});
        }
    },

    //Pegar a área de acordo com o filtro com condicional caso não tenha nada
    async getAreasByTitle(req, res){
        try{
            const areas = await homeStudentsModel.getAreasByTitle(req.body);

            if(areas.length === 0){
                return res.status(200).render( 'homeStudents', {
                    message: 'Nenhuma área encontrada',
                    areasByTitle: areas
                })
            }

            res.status(200).render('homeStudents', {
                areasByTitle: areas,
            })

        } catch(err){
            res.status(500).json({message: err.message});
        }
    }
}