import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const { USER, PASSWORD, HOST, DBPORT, KEY, NAME, SERVERPORT } = process.env;
let db;

const awaitConnection = async() => {
  if (process.env.USER && process.env.PASSWORD && process.env.HOST) {
    db = await mongoose.connect(`mongodb://${USER}:${PASSWORD}@${HOST}:${DBPORT}/${NAME}`, { useNewUrlParser: true })
      .then(() => console.log(`Conection open on port ${DBPORT}`));

  } else {
    db = await mongoose.connect(`mongodb://localhost:${DBPORT}/${NAME}`, { useNewUrlParser: true })
      .then(() => console.log(`Conection open on port ${DBPORT}`));
  }
}

awaitConnection();

export {KEY,SERVERPORT,db};
