require('dotenv').config();
const { user, password, host, DB_PORT, name } = process.env;

module.exports = {
  mainBD: `mongodb://localhost:${DB_PORT}/pokemons_db`,
  sessionBD: `mongodb://localhost:${DB_PORT}/session_db`
} 