import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { KEY } from '../config/config';
import userUrlBuilder from '../utils/urlbuilders/UserUrlBuilder';

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post(
  userUrlBuilder
    .build()
    .signup()
    .use(),
  async (req, res) => {
    const hashedPassword = await bcrypt.genSalt().then( salt => bcrypt.hash(req.body.password, salt));
    
    await User.create({
      login: req.body.login,
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword
    })
      .then( user => {
        return res.status(200).send('Everything good. You\'re singed up');
      })
      .catch( err => res.status(500).send(err));
})

router.post(
  userUrlBuilder
    .build()
    .login()
    .use(),
  (req, res) => {

    User.findOne({ login: req.body.login })
      .then(user => {
        if(!user) return res.status(404).send('Not so fast fella');

        const validPassword = bcrypt.compareSync(req.body.password, user.password);
        if(!validPassword) return res.status(401).send({ auth: false, token: null});

        const token = jwt.sign({ id: user._id }, KEY, {
          expiresIn: 100000
        });

        res.status(200).send({ auth: true, token: token });
      })
      .catch(err => res.status(500).send('Server\'s error'));
});
  
export default router;
