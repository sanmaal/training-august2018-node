"use strict"
const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_ID,
  TOKEN_SECRET
} = process.env;

module.exports = {
  mongoURI: `${DB_NAME}://${DB_USER}:${DB_PASS}@${DB_ID}`,
  secret: TOKEN_SECRET
}