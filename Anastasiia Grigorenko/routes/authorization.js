const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { key } = require('../config');
const { Pokemon } = require('../models/Pokemon');
const { User, validateUser } = require('../models/User');

router.post('/signup', (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if(err) return res.status(500).send('Error');

        const user = await User.findOne({ email: req.body.email }).exec()
        if (user) return res.status(400).send('The user with this email already exists!');

        const newUser = new User({
            _id: new  mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
        });

        newUser.save()
            .then(() => res.status(201).send(newUser));
    });
});

//роут, по которому получаем токен
router.post('/login', function(req, res){
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    User.findOne({ email: req.body.email }).exec()
        .then(user => {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) {
                    return res.status(401).send('Unauthorized Access');
                }
                if(result) {
                    const JWTToken = jwt.sign({
                            _id: user._id,
                            email: user.email
                        },
                        key);
                    return res.status(200).json({
                        success: 'Welcome to the JWT Auth',
                        token: JWTToken
                    });
                }
            });
        })
        .catch(error => {
            res.status(500).send('Error');
        });
});

module.exports = router;