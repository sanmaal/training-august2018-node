# API

`npm install` to install dependencies

Before you can initilize database you should customize environment variables. In order to do it create `.env` file in root folder and fill it accordong to the example:

`USER = USER
 PASSWORD = PASSWORD
 HOST = HOST
 DBPORT = DBPORT
 NAME = NAME
 KEY = KEY
 SERVERPORT = SERVERPORT`

After you finished you have 2 diferrent ways to initilize database:

 * 'npm run dbinit' - initilize database without starting the project
 * use init endpoin - start the project and use /initialize/ endpoint

#### users ####

 * users/signup - register new user
 * users/login - create jsonwebtoken 

#### pokemons ####

 * pokemons/
 * pokemons/user
 * pokemons/catched
 * pokemons/catch
 * pokemons/:pokemonId

#### init ####

 * initialize/
