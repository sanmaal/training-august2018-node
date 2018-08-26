const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ name: req.body.name });
    if (!user) return res.status(400).send('Invalid name or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid name or password.');

    const token = user.generateAuthToken();
    res.send(token);
});

router.post('/signup', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ name: req.body.name });
	if (user) return res.status(400).send('This name is already taken.');
	
	user = new User({
		name: req.body.name,
		password: req.body.password,
	});

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	await user.save();

	const token = user.generateAuthToken();
	res
		.header('x-auth-token', token)
		.send({
			// _id: user._id,
			// name: user.name,
			message: 'You are good to go'
		})
})

module.exports = router;
