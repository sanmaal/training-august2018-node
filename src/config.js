const express = require("express");
const app = express();
const ROUTES = require('./routes.js');
const path = require('path');

const pg = require('pg');
const connectionString = require('./db');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session');
//const getData = require('./rest/restapi.js');


module.exports = {express,app,ROUTES,path,pg,connectionString,bodyParser, bcrypt, passport, session, LocalStrategy}