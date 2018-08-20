const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = (payload) => jwt.sign(payload, secret );