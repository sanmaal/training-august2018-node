import express from 'express';
import db from './config/db';
import InitController from './controllers/InitController';
import AuthController from './controllers/AuthController';
import PokemonsController from './controllers/PokemonsController';
import RoutesBuilder from './Utils/urlbuilders/AppRoutesBuilder';

const app = express();

app.use(
  RoutesBuilder
    .build()
    .init()
    .use(),
    InitController
);

app.use(
  RoutesBuilder
    .build()
    .users()
    .use(),
  AuthController
);

app.use(
  RoutesBuilder
    .build()
    .pokemons()
    .use(),
  PokemonsController
);

export default app;
