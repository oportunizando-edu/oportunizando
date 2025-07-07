const pool = require('../config/db');
const opportunitiesModel = require('../models/opportunitiesModel');

exports.getOpportunitiesPage = async(req, res) => {
    try{
        const areaId = req.params.areaId;
        const opportunities = await opportunitiesModel(areaId);
        res.render('opportunitiesByArea', {
            opportunities,
        })
    } catch(err){
        res.status(500).json({message: err.message});
    }

}