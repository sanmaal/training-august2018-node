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