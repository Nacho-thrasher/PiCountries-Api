const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Users } = require('../db');
const { authenticateToken } = require('../middleware/authorization');
const { generateJwt } = require('../helpers/generateJwt');
const { validarJwt } = require('../middleware/validarJwt');
//?LOGIN //? podemos usar express validator

//? get usuarios
router.get('/', validarJwt, async (req, res) => {
    const users = await Users.findAll();
    res.json({
        ok: true,
        user: req.uid,
        users,
    });
})

//? post usuario
router.post('/', async(req, res) => {
    const { name, email, password } = req.body;
    try {
        if(!name || !email || !password) return res.status(400).json(
            {
                ok: false,
                msg: 'El email ya esta registrado'
            }
        )
        const existEmail = await Users.findOne({ where: { email } });
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya esta registrado'
            });
        }    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
            name,
            email,
            password: hashedPassword
        });
        //? mandar id_user
        const token = await generateJwt(user.id_user);
        res.json({
            ok: true,
            user,
            token
        });
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
})


//?export
module.exports = router;