const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { Countries, Activities, Users } = require('../db');

//? inner join sequelize //? no usado ahora
router.get('/:activity', async (req, res) => {
    const { activity } = req.params;
    const countries = await Activities.findAll({
        include: {
            model: Countries,
            attributes: ['id_country', 'name', 'imagen_bandera', 'continente', 'capital', 'region', 'subregion', 'poblacion'],          
            through: {
                attributes: []
            },
        },
        where: { name: activity }
    })
    res.json(countries[0].Countries);
})

module.exports = router;