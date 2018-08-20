const user = 'postgres';
const password = 'postgres';
const server = 'localhost';
const port = '5432';
const database = 'pokemons';

const connectionString = `postgres://${user}:${password}@${server}:${port}/${database}`;

module.exports = connectionString;