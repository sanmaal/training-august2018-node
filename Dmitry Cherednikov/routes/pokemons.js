const express = require('express');
const { Pokemon, validate } = require('../models/Pokemon');
const { User } = require('../models/user');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/all', (req, res) => { // todo
	const { page, amount } = req.query;
	Pokemon.find()
		.skip(page * amount - amount)
		.limit(parseInt(amount))
		.then(pokemons => res.send(pokemons)) // todo
		.catch(err => {
			// handle errors
			res.status(500).send({ message: 'Something went wrong' })
		})
});

router.get('/all/:id', (req, res) => { // todo
	Pokemon.findOne({ id: req.params.id})
		.then((pokemon) => {	
				if (!pokemon) return res.status(404).send({ message: `Not found` })
				res.send(pokemon);
		})
		.catch(err => {
			// handle errors
			res.status(500).send({ message: `Something went wrong` })
		})
});

router.get('/catched', auth, (req, res) => {
	const { _id } = req.user;
	const { page, amount } = req.query;

	User.findById(_id, { password: 0 })
	.then(data => res.send(
		data.catched.slice(page * amount - amount, page * amount))
	)
	.catch(err => {
		// handle errors
		res.status(500).send('Something went wrong');
	})
});

// todo
router.put('/catched', auth, async (req, res) => {
	const { _id } = req.user;
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findById( _id, { password:  0 });
	const check = user.catched.some(poke => req.body.id === poke.id);
	if (check) return res.status(400).send('You have already catched this pokemon');

	User.findByIdAndUpdate(_id,  { $push: { catched: req.body }})
		.then(() => res.send(req.body))
		.catch(err => {
			// handle errors
			res.status(500).send('Something went wrong');
		})
})

module.exports = router;