const pokemons = require('../../db.json');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'pokemons-homework';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    getPokemonsList(db,(docs) => {console.log(docs); client.close();});

});

const getPokemonsList = function (db, callback) {
    const page = 1;
    const skipElements = (page - 1) * 10;
    const collection = db.collection('pokemons');
    collection.find({},{'limit':10,'skip':skipElements}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        callback(docs);
    });
};
