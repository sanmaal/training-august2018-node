const app = require('./app');
const port = process.env.PORT || 5005;
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

const pokemons = require('./routes/pokemons');
const user = require('./routes/user');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.status(200).send('server is working');
});
app.use('/pokemons', pokemons);
app.use('/user', user);

app.listen(port, () => console.log(`Server started on port ${port}`));