const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
const User = require('../../../models/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../../config/authConfig');


const checkAuth = require('../../../middlewares/auth/checkAuth');

router.post('/register', (req, res) => {

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
        .then(user => {
            const token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 86400 //24 hours
            });
            res.status(200).send({token: token});
        })
        .catch(() => res.status(500).send("Something wrong with registration."))
});

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) return res.status(404).send('No user found.');
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({token: null});
            const token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            res.status(200).send({token: token});
        })
        .catch(() => res.status(500).send('Error on the server.'))
});

router.get('/logout', (req, res) => {
    res.status(200).send({token: null});
});

module.exports = router;