const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const { uri } = require('./config');
const pokemons = require('./routes/pokemons');
const authorization = require('./routes/authorization');

const app = express();

mongoose.connect(uri,{ useNewUrlParser: true })
    .then(console.log('Success connection to database!'))
    .catch(err => console.log(err));

app.use(express.json());
app.use('/api', pokemons);
app.use('/api', authorization);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));