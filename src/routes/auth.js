const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Users } = require('../db');
const jwt = require("jsonwebtoken");
const { jwtTokens } = require("../utils/jwt-helpers") //? import jwtTokens
const { generateJwt } = require('../helpers/generateJwt');

//? login
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El email no esta registrado'
            });
        }
        //? pass verify
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña es incorrecta'
            });
        }
        const token = await generateJwt(user.id_user);
        //? respuesta
        res.json({
            ok: true,
            usuario: {
                id_user: user.id_user,
                name: user.name,
                email: user.email,
                foto_url: user.foto_url,
                favoritos: user.favoritos
            },
            token
        });
         
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
})

//? delete refresh token
router.delete('/refresh_token', (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({message: "Logout success"})
    } catch (error) {
        res.status(401).json({error: error.message});
    }
})

//? refresh token
router.post('/refresh_token', async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ error: 'No token, please login' });
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            const tokens = jwtTokens({ id_user: user.id_user, name: user.name, email: user.email });
            res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
            res.json(tokens);
        })
    } 
    catch (error) {
        res.status(401).json({ error: error.message });
    }
})

//?export
module.exports = router;