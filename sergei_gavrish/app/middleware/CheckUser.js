import User from '../models/User';

export const checkUser = (req, res, next) => {
  User.findOne({login: req.body.login})
  .then( user => {
    if( user && user.login === req.body.login ) {
      return res.status(400).send('Login is already taken');
    }
    next();
  })
  .catch( err => {
    res.status(500).send('Something went wrong');
    return console.error(err);
  });
}