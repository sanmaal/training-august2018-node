const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const pokemons = require('./routes/api/pokemons');
const AuthController = require('./routes/api/auth/auth');
const handleToken = require('./middlewares/auth/handleToken');

const app = express();

const corsOptions = {
    origin: ['http://localhost:8080', 'http://localhost:4200']
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


app.use(handleToken);
app.use('/api/auth', AuthController);
app.use('/api/pokemons', pokemons);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));