const jwt = require("jsonwebtoken");

//? jwt verify and sign
function jwtTokens({ id_user, name, email }) {
    const user = { id_user, name, email };
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return ({ token, refreshToken });
}

//? exportar funcion
module.exports = {jwtTokens};