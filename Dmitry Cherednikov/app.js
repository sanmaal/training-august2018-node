const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const { uri } = require('./config');
const auth = require('./routes/auth');
const pokemons = require('./routes/pokemons');

const app = express();


mongoose.connect(uri, { useNewUrlParser: true })
	.then(() => console.log('cheeki breeki'))
	.catch(err => {
		// handle errors
	})

app.use(cors());
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/pokemons', pokemons);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));