import User from '../models/User';

export const checkPokemon = (req, res, next) => {
  User.findById(req.userId)
  .then( user => {
    const { catchedPokemons } = user;
    if(catchedPokemons.some( pokemon => `${pokemon}` === req.body.id) || !req.body.id) {
      return res.status(400).send('Already catched');
    }
    next();
  })
  .catch( err => {
    res.status(500).send('Something went wrong');
    return console.error(err);
  });
}
