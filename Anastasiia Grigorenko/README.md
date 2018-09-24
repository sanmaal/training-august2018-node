##Backend for pokedex

###Initializing the database

`npm run init-database`

###Run server

`npm install`
`npm run dev`

Go to [GitHub](localhost:3001/api/pokemons?page=1&amount=10)

- - - -

###Endpoints:

`/api/pokemons?page=1&amount=10` - get all pokemons from page 1 in amount 10
`/api/pokemons/1` - get a pokemon with id=1

To complete this query, use postman and set the request header of the following type: *key*: authorization, *value*: Bearer <token>, where the <token> is the string, which was get when a user logged in. (get method)
`/api/catched?page=1&amount=10` - get catched pokemons from page 1 (only available for authorized users)

To complete this query, use postman and write in the body the object of desired pokemon in json format (put method).
Set the request header of the following type: key: authorization, value: Bearer <token>, where the <token> is the string, which was get when a user logged in.
`/api/catched` - catch the pokemon (only available for authorized users).

To complete this queries, use postman and write in the body the object with email and password in json format (post method)
`/api/signup` - user creation (sign up)
`/api/login` - log in