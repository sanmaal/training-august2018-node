## Backend for pokedex application ##

### Cli commands ###

`npm run initDb` - initialize data base

`npm run dev` - start server with nodemon

`npm start` - start server

### API ###

#### Pokemons ####
GET `/pokemons` - get pokemons by query string. Queries: `_start`, `_limit`
GET `/pokemon/:id` - get pokemon by id

#### Users ####
GET `/users` - get all users `token required`
GET `/user` - get user `token required`
DELETE `/user` - delete user `token required`

#### Catched pokemons ####
PUT `/catch` - catch pokemon `token required`
GET `/catched` - get catched pokemons of user `token required`

#### Auth ####
POST `/register` - register new user. Body params: `name`, `email`, `password`
GET `/authorize` - auth user. Returns user `token required`
POST `/login` - logining in user. Body params: `email`, `password`