import jwt from 'jsonwebtoken';
import { KEY } from '../config/config';

export const authorization = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({auth: false, message: 'no token provided.'});
  
  jwt.verify(token, KEY, (err, decoded) => {
    if (err) return res.status(500).send(err);
    req.userId = decoded.id;
    next();
  });
}
