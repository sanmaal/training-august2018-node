import User from '../models/User';

export const checkPokemon = (req, res, next) => {
  User.findById(req.userId)
  .then( user => {
    const { catched } = user;
    if(catched.some( pokemon => pokemon.id === req.body.id)) {
      return res.status(400).send('Already catched');
    }

    next();
  })
  .catch( err => {
    res.status(500).send('Something went wrong');
    return console.error(err);
  });
}
