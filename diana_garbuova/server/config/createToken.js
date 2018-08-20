const jwt = require('jsonwebtoken');
const { secret } = require('./secret');

module.exports = (payload) => jwt.sign(payload, secret );