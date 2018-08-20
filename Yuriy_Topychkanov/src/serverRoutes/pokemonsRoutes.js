const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const controllers = require('./controllers');


module.exports = function (app, db) {

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(username, password,done){
        let users = db.collection('users');
        users.findOne({ email : username},function(err,user){
            const hashPassword = crypto.createHmac('sha256', password).update('I love cupcakes').digest('hex');
            return err
                ? done(err)
                : user
                    ? hashPassword === user.password
                        ? done(null, user)
                        : done(null, false, { message: 'Incorrect password.' })
                    : done(null, false, { message: 'Incorrect username.' });
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });



    app.get('/pokemons', (req, res) => {
        const { _page } = req.query;
        const skipElems = (_page - 1) * 10;
        db.collection('pokemons').find({},
            {
                'limit': 10,
                'skip': skipElems
            })
            .toArray(function (err, pokemons) {
                res.send(pokemons);
            });

    });


    app.post('/users/register/',(req, res) => {
        const {email, password} = req.body;
        if(email !== undefined && password !== undefined)
        {
            const hashPassword = crypto.createHmac('sha256', password).update('I love cupcakes').digest('hex');
            const userObj = { email: email, password: hashPassword, capturedPokemons: [] };
            db.collection('users').insertOne(userObj,(err, result) => {
                if (err) {
                    res.send(err.code);
                } else {
                    res.send(result.ops[0]);
                }
            });
        }
    });

    app.post('/users/authorize/', (req, res, next) => {
        const {email} = req.body;
        if(email !== undefined)
        {
            controllers.login(req, res, next)
        }

    });




};
