const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/api");
const users = require("./userBehavior/api");
const User = require("./models/user");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const app = express();

mongoose.connect("mongodb://localhost/pokemonsList");
mongoose.Promise = global.Promise;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(
	session({
	  secret: "secretkey",
	  resave: false,
	  saveUninitialized: false,
	  authenticated: true,
	  store: new MongoStore({
		url: "mongodb://localhost:27017/sessions",
		ttl: 24 * 60 * 60
	  })
	})
  );

app.use(express.static("frontend"));

app.use("/api", routes);

app.use("", users);

app.use(function(err, req, res, next) {
  res.status(422).send({ error: err.message });
});

let portNumber = 3000;

app.listen(process.env.port || portNumber, function() {
  console.log("listening for reqests");
});
