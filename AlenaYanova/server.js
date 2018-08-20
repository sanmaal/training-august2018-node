const
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  fs = require('fs'),
  mongoose = require('mongoose'),
  config = require('./config/main'),
  url = require('./config/db').url,
  options = require('./config/db').options,
  router = require('./app/routes'),
  errorHandler = require('./utils/error_handler').errorHandler;

mongoose.connect(url, options)
  .then(() => {
    console.log('App connected to database');
  })
  .catch(err => {
    console.log(err);
  });

const devLogStream = fs.createWriteStream(__dirname + '/dev.log', { flags: 'a' });
app.use(logger('dev', { stream: devLogStream }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router(app);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log('App is running on port ' + config.port);
});