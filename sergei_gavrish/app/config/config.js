import dotenv from 'dotenv';

dotenv.config();

const { USER, PASSWORD, HOST, DBPORT, NAME, KEY, SERVERPORT } = process.env;

export { USER, PASSWORD, HOST, DBPORT, NAME, KEY, SERVERPORT };