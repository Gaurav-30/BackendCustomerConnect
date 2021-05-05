const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next){
    try{
        const jwtToken = req.header('token');

        if(!jwtToken){
            res.json("Not Authorized");
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        req.user = payload.user;

        next();

    }catch(err){
        res.status(401).json("Invalid Token");
    }
}