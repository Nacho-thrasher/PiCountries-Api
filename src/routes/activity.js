const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { Countries, Activities, Users } = require('../db');

//? get
router.get('/', async (req, res) => {
    const activities = await Activities.findAll({
        include: {
            model: Countries,
            attributes: ['id_country', 'name', 'imagen_bandera', 'continente', 'capital', 'region', 'subregion', 'poblacion'],
            through: {
                attributes: []
            },
        }
    });
    res.json(activities);
})

//? post
router.post('/', async(req, res) => {
    try {
        // si req.body no trae nada error 
        if (!req.body[1] || !req.body[0]) {
            res.status(400).json({
                error: 'No data'
            });
        } else {
            const nameActivity = req.body[0].name.toLowerCase();
            req.body[0].name = req.body[0].name.toLowerCase();
            const findIfExists = await Activities.findAll({
                where: { name: nameActivity }
            })
            if(findIfExists.length > 0){ 

                req.body[1].forEach(async(country) => {
                    const countriesId = await Countries.findByPk(country.id_country);
                    findIfExists[0].addCountries(countriesId);
                });
                console.log(req.body[1]);
                return res.json()
            
            }
            // si req.body trae algo    
            const createActivities = await Activities.create(req.body[0]);
            req.body[1].forEach(async(country) => {
                const countriesId = await Countries.findByPk(country.id_country);
                createActivities.addCountries(countriesId);
            });
            //? buscar por id             
            const obj = {
                dificultad: createActivities.dificultad,
                duracion: createActivities.duracion,
                id_actividad: createActivities.id_actividad,
                name: createActivities.name,
                temporada: createActivities.temporada,
                countries: [...req.body[1]]
            }
            res.json(obj);
        }
    } 
    catch (error) {
        res.status(404).json({error: error});
    }
})

//? delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activities.findByPk(id);
        const activityName = activity.name;
        const activityId = activity.id_actividad;
        if (!activity) {
            return res.json({
                error: 'actividad no encontrada'
            });
        }
        await activity.destroy();
        res.json({
            message: `Se elimino la actividad ${activityName}`,
            name: activityName,
            id: activityId
        });
    } catch (error) {
        res.status(404).json({ error });
    }
})

module.exports = router;