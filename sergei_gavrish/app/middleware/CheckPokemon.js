import User from '../models/User';

export const checkPokemon = (req, res, next) => {
  console.log(req.body.id);
  User.findById(req.userId)
  .then( user => {
    const { catched } = user;
    catched.some( pokemon => {
      // console.log(typeof req.body.id);

      console.log(pokemon.id);
    });
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
