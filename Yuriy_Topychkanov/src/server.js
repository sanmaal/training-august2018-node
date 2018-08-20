const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const dbConn = require('./config/db');
const passport = require('passport');
const session = require('express-session');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    next();
});
app.use(session({secret:'SECRET'}));
app.use(passport.initialize());
app.use(passport.session());
MongoClient.connect(dbConn.url, (err, database) => {
    const db = database.db(dbConn.dbName);
    if (err)
    {
        return console.log(err)
    }
    require('./serverRoutes/index.js')(app, db);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});
