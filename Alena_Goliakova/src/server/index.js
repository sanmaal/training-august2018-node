const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const app = express ();
const port = 3000;

const passport = require ('passport');
const session = require ('express-session');
app.use (bodyParser.urlencoded ({extended: true}));

app.use (session ({secret: 'SECRET'}));
app.use (passport.initialize ());
app.use (passport.session ());

mongoose.connect ('mongodb://localhost/homeworkDB');
const db = mongoose.connection;

db.on ('error', console.error.bind (console, 'connection error:'));
db.once ('open', function () {
  require ('./routes/pokemonRoutes.js') (app, db);
  require ('./routes/userRoutes.js') (app, db);
});

app.listen (3000);
