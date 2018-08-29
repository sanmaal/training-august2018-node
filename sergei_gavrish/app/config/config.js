import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

if (process.env.LOCAL_DB) {
  const { DBPORT, NAME, KEY, SERVERPORT } = process.env;
  const db = mongoose.connect(`mongodb://localhost:${DBPORT}/${NAME}`, { useNewUrlParser: true });
  export { KEY, SERVERPORT, db };
} else {
  const { USER, PASSWORD, HOST, DBPORT, NAME, KEY, SERVERPORT } = process.env;
  const db = mongoose.connect(`mongodb://${USER}:${PASSWORD}@${HOST}:${DBPORT}/${NAME}`, { useNewUrlParser: true });
}

export {
  KEY,
  SERVERPORT,
  db,
};
