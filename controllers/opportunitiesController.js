const opportunitiesModel = require('../models/opportunitiesModel');

exports.getOpportunitiesPage = async(req, res) => {
    try{
        const areaId = req.params.areaId;
        const [opportunities, areaTitle] = await Promise.all([
            opportunitiesModel.getOpportunitiesByArea(areaId),
            opportunitiesModel.getAreaTitle(areaId)
        ]);
        res.render('opportunitiesByArea', {
            opportunities,
            areaTitle
        })
    } catch(err){
        res.status(500).json({message: err.message});
    }

}