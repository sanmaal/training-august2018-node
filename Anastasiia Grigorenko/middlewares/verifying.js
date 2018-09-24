const jwt = require('jsonwebtoken');
const { key } = require('../config');

module.exports = function(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) return res.status(403).send('Forbidden');
    else {
        const token = bearerHeader.split(' ')[1];
        req.user = jwt.verify(token, key);
        next()
    }
};