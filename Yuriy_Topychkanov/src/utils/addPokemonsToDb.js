const pokemons = require('../../db.json');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbConn = require('../config/db');
// Use connect method to connect to the server
MongoClient.connect(dbConn.url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbConn.dbName);
    insertDocuments(db,() => {client.close();});

});




const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('pokemons');
    // Insert some documents
    collection.insertMany( pokemons.pokemons,
        function(err, result) {
        assert.equal(err, null);
        console.log(`${pokemons.pokemons.length} pokemons have been inserted`);
        callback(result);
    });

    db.collection('users').createIndex('email',{unique:true});
};
