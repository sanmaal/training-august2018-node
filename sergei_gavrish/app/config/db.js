import mongoose from "mongoose";
import  { USER, PASSWORD, HOST, DBPORT, NAME } from './config';

mongoose.connect(`mongodb://${USER}:${PASSWORD}@${HOST}:${DBPORT}/${NAME}`, { useNewUrlParser: true });
