const app = require('./app');
const port = process.env.PORT || 5005;
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

const pokemon = require('./routes/pokemon');
const user = require('./routes/user');
const auth = require('./routes/auth');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.status(200).send('server is working');
});
app.use('/', pokemon);
app.use('/', user);
app.use('/', auth);

app.listen(port, () => console.log(`Server started on port ${port}`));