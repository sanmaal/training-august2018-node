const jwt = require('jsonwebtoken');
const { secret } = require('./secret');

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, secret);
    if (decoded) {
      req.userId = decoded.id;
      next();
    } else {
      res.status(401).send('Cannot verify token')
    }
  } else {
    res.status(403).send('There is no token');
  }
};

module.exports = checkToken;