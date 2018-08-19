const express = require('express');
const mongoose = require('mongoose');

const pokemons = require('./routes/pokemons');
const pokemon = require('./routes/pokemon');
const app = express();

const db = require('./config/keys').mongoURI;
const port = process.env.PORT || 5005;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('server is working');
});
app.use('/pokemons', pokemons);
app.use('/pokemon', pokemon);

app.listen(port, () => console.log(`Server started on port ${port}`));