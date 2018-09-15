const express = require('express');
const mongoose = require('mongoose');

const { getConnect } = require('./config');
const Routes = require('./routes');

const { APP_PORT } = process.env;

async function start() {

  const app = express();
  const isMongoAlive = await initMongoose();

  console.log(`Mongo boy is alive: ${isMongoAlive}`);

  Routes.init(app);

  return new Promise((resolve, reject) => {
    app.listen(APP_PORT, (err) => {
      err ? reject(err) : resolve(APP_PORT);
    });
  });
}


async function initMongoose() {
  try {
    await mongoose.connect(getConnect(), { useNewUrlParser: true });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

start()
.then((port) => console.log(`Server is started on port: ${port}`))
.catch((err) => console.error(`Server is down: ${err}`));
