const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { Countries, Activities, Users } = require('../db');

router.get('/', async (req, res) => {
    try {
        //? si viene algun query
        if (req.query.name) {
            const countries = await Countries.findAll({
                where: {
                    name: {
                        [Sequelize.Op.like]: `%${req.query.name}%`
                    }
                },
                include: { model: Activities }
            })
            return res.json(countries);
        }
        const countries = await Countries.findAll({ include: { model: Activities } });
        res.json(countries);
        
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const country = await Countries.findByPk(id, { include: { model: Activities } });
        if (!country) {
            return res.json({
                error: 'country not found'
            });
        }
        res.json(country);
    } catch (error) {
        res.status(404).json({ error });
    }
})

module.exports = router;