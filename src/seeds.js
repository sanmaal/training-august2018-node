const {express,app,ROUTES,path,pg,connectionString,bodyParser,bcrypt, passport, session} = require("./config");
const pokemons = require("./pokemon.json");
const users = require("./users.json");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


const pokemonSeed = (req, res, next) => {
const results = [];

pg.connect(connectionString, (err, client, done) => {
    if(err) {
    done();
    console.log(err);
    return res.status(500).json({success: false, data: err});
    }

    const createPokemonTableQuery = {text: 'create table pokemons (id integer, name varchar(100))'},
          createTableUsers = {text: "CREATE TABLE public.users ("+
              "id serial,"+
              "login varchar(100) COLLATE pg_catalog.\"default\" NOT NULL,"+
              "password varchar(100) COLLATE pg_catalog.\"default\" NOT NULL,"+
              "CONSTRAINT users_pkey PRIMARY KEY (id),"+
              "CONSTRAINT login_password UNIQUE (login, password)"+
          ")"}
          dropPokemonTableQuery = {text: 'drop table IF EXISTS pokemons'},
          dropTableUsersQuery = {text: 'drop table IF EXISTS users'}
          insertPokemonJsonQuery = {text: `insert into pokemons select * from json_to_recordset('${JSON.stringify(pokemons.pokemons)}') as x(id integer, name varchar(100));`};
          insertUsersJsonQuery = {text: `insert into users select * from json_to_recordset('${JSON.stringify(users.users)}') as x(id integer,login varchar(100),password varchar(100));`}

    client.query(dropPokemonTableQuery);
    client.query(dropTableUsersQuery);
    
    
    client.query(createTableUsers);
    client.query(createPokemonTableQuery);
    client.query(insertPokemonJsonQuery);
    client.query(insertUsersJsonQuery);

    const query = client.query('SELECT * FROM pokemons ORDER BY id ASC');
    query.on('row', (row) => {
    results.push(row);
    });
    query.on('end', () => {
    done();
    //return res.json(results);
    });
}); 
//res.send(req.body);
};

pokemonSeed();
