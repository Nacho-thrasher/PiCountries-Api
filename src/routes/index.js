const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countriesRouter = require('./country.js');
const activitiesRouter = require('./activity.js');
const countryActivityRouter = require('./countryActivity.js');
const userRouter = require('./user.js');
const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
router.use('/api/auth', authRouter);
router.use('/api/users', userRouter);
router.use('/api/countries', countriesRouter);
router.use('/api/activities', activitiesRouter);
router.use('/api/countryActivity', countryActivityRouter);

module.exports = router;
