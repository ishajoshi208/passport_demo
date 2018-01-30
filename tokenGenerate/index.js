const config = require('../config');
const jwt = require('jsonwebtoken');

exports.getToken = function (user) {
    console.log("i am here token");
    return jwt.sign(user, config.secretKey,
        { expiresIn: 3600 });
}