const jwt = require("jsonwebtoken");
                                    //'cookie'
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]; //? authorization
    const token = authHeader && authHeader.split(" ")[1]; //? authorization Bearer token
    if (token == null) return res.status(401).json({ error: "Unauthorized" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({ error: "Unauthorized" });
        req.user = user;
        next();
    })
}
//export 
module.exports = { authenticateToken };
