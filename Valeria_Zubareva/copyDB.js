const Pokemon = require('./models/Pokemon');
const dbJson = require('../pokemons');
const mongoose = require('mongoose');

// db Config
const db = require('./config/keys').mongoURI;

const initDB = () => {
    return mongoose
        .connect(db, {useNewUrlParser: true})
        .then(() => mongoose.connection.dropDatabase())
        .then(async () => {
            await Pokemon.insertMany(dbJson.pokemons);
        })
        .catch(err => console.log(err));
};

(async () => {
    await initDB();
    mongoose.disconnect();
})();










