const jwt = require('jsonwebtoken')
require('dotenv').config();

  generateToken = user => {
    return jwt.sign({
        iss:'avinash',
        sub:user.id,
        iat: Math.floor(Date.now()/1000),
    },process.env.secret,{
        expiresIn:'60m'
    });
}

refreshToken = user => {
    return jwt.sign({
        iss:'avinash',
        sub:user.id,
        iat: Math.floor(Date.now()/1000),
    },process.env.secret,{
        expiresIn:'1d'
    });
}


module.exports = {
    generateToken,
    refreshToken
}