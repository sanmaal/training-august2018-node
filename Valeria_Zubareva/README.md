# Pokedex

Server side of POKEDEX

## Installing

Install npm packages

```
npm install
```

And create file .env with following example

```
DB_USER=user_name
DB_PWD=user_password
DB_NAME=database_name
DB_HOST=database_host
DB_PORT=database_port
```

### First initialization of DB
Use it just once to copy your json to DB

```
npm run initDB
```

### Running application

```
npm run server
```

## Use
### Auth
Post http request, specify in the body user's `name`, `email` and `password`
```
http://localhost:5000/api/auth/register
```
to register user.


Post http request, specify in the body user's `email` and `password`
```
http://localhost:5000/api/auth/login
```
to login.

### Pokemons
Get http request for getting part of pokemons, specify `token` in headers for authorized user.
```
http://localhost:5000/api/pokemons?offset=0&limit=16
```

Get http request for getting part of caughtPokemons, specify `token` in headers it's required.
```
http://localhost:5000/api/pokemons/caughtPokemons?offset=0&limit=16
```

Put http request for pushing pokemons into user's caught pokemons. Specify in the body `pokemonId`, `time` and `token` in headers
```
http://localhost:5000/api/pokemons
```
