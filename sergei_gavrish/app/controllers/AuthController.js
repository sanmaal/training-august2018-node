import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { KEY } from '../config/config';
import userUrlBuilder from '../utils/urlbuilders/UserUrlBuilder';
import { checkUser } from '../middleware/CheckUser';

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post(
  userUrlBuilder
    .build()
    .signup()
    .use(),
    checkUser,
  async (req, res) => {
    const hashedPassword = await bcrypt.genSalt()
      .then( salt => bcrypt.hash(req.body.password, salt))
      .catch( err => {
        res.status(500).send('Something went wrong');
        return console.error(err);
      });
    
    User.create({
      login: req.body.login,
      password: hashedPassword
    })
      .then( user => {
        return res.status(200).send({ message: 'Everything good. You\'re singed up'})
    })
      .catch( err => {
        res.status(500).send('Something went wrong');
        return console.error(11111,err);
      });
})

router.post(
  userUrlBuilder
    .build()
    .login()
    .use(),
  (req, res) => {

    User.findOne({ login: req.body.login })
      .then( user => {
        if(!user) res.status(404).send('User not found');

        const validPassword = bcrypt.compareSync(req.body.password, user.password);
        if(!validPassword) return res.status(400).send({ auth: false, token: null});

        const token = jwt.sign({ id: user._id }, KEY, {
          expiresIn: 86400
        });

        res
          .send({
            auth: true,
            tokenId: token,
            expiresIn: 86400,
          });
      })
      .catch( err => {
        if(!res.headersSent) res.status(500).send('Something went wrong');
        return console.error(err);
      });
});
  
export default router;
