const homeStudentsModel = require('../models/homeStudentsModel');

module.exports = {
    //Carregar a página
    async getHomePage(req, res) {
        try {
            const userId = req.session.user?.user_id;
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
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    //Recarregar a página com as informações da pesquisa por área
    async searchByTitle(req, res) {
        try {
            const userId = req.session.user?.user_id;
            const isLogged = !!req.session?.user;

            const [areasByStudent, areas, areasByTitle] = await Promise.all([
                homeStudentsModel.getAreasByStudentsId(userId),
                homeStudentsModel.getAllAreas(),
                homeStudentsModel.getAreasByTitle(req.body.area)
            ]);  
        
            res.render('homeStudents', {
                isLogged,
                areasByStudent,
                areas,
                areasByTitle: (areasByTitle.length === 0) ? null : areasByTitle,
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}