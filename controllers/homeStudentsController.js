const homeStudentsModel = require('../models/homeStudentsModel');

module.exports = {
    //Carregar a página
    async getHomePage(req, res) {
        try {
            const userId = req.session.user?.id;
            const isLogged = !!req.session?.user;
            const [areasByStudent, areas] = await Promise.all([
                homeStudentsModel.getAreasByStudentsId(userId),
                homeStudentsModel.getAllAreas()
            ]);
            res.render('homeStudents', {
                isLogged,
                areasByStudent,
                areas,
                areasByTitle: null,
                message: null
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    //Recarregar a página com as informações da pesquisa por área
    async searchByTitle(req, res) {
        try {
            const userId = req.session.user?.id;
            const isLogged = !!req.session?.user;

            const [areasByStudent, areas, areasByTitle] = await Promise.all([
                homeStudentsModel.getAreasByStudentsId(userId),
                homeStudentsModel.getAllAreas(),
                homeStudentsModel.getAreasByTitle(req.body.area)
            ]);            
            let message = null;
            if (!areasByTitle.length) {
                message = 'Nenhuma área encontrada';
            }
            res.render('homeStudents', {
                isLogged,
                areasByStudent,
                areas,
                areasByTitle,
                message
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}