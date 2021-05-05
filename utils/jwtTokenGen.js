const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(cust_id){
    const payload = {
        user: cust_id,
    }

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1y"});
}

module.exports = jwtGenerator;