# ☆彡 POKEMON API ミ☆ #

`npm install` to install dependencies

Before you can initilize database you should customize environment variables. In order to do it create `.env` file in root folder and fill it accordong to the example:

* `USER = USER`
* `PASSWORD = PASSWORD`
* `HOST = HOST`
* `DBPORT = DBPORT`
* `NAME = NAME`
* `KEY = KEY`
* `SERVERPORT = SERVERPORT`

If you use local database, do not use USER, PASSWORD, HOST.
SERVERPORT - optional variable.

After you finished you have 2 diferrent ways to initilize database:

 * 'npm run dbinit' - initilize database without starting the project
 * use init endpoin - start the project and use /initialize/ endpoint

#### users ####

 * users/signup - register new user
 * users/login - login and create jsonwebtoken

#### pokemons ####

 * pokemons/ - return all pokemons, redirect to pokemons/user if use jsonwebtoken
 * pokemons/user - return pokemons and catched pokemons
 * pokemons/catched - return catched pokemons
 * pokemons/catch - catch pokemon
 * pokemons/:pokemonId - return pokemon

#### init ####

 * initialize/ - delete pokemon collection and create another one
