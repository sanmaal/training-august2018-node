"use strict"
const jwt = require('jsonwebtoken');
const config = require('../config/keys');

const checkToken = (req, res, next) => {
  const token = req.headers['x-token'];
  if (!token) {
    return res.status(403).send({ 
      isAuth: false, 
      status: 'No token' 
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ 
        isAuth: false, 
        status: 'Failed to authenticate token' 
      });
    }
    req.payload = decoded;
    next();
  });
};

module.exports = checkToken;