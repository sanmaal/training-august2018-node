const {express,app,ROUTES,path,pg,connectionString,bodyParser,bcrypt, passport, session} = require("./config");
const {auth, findOne} = require("./auth");
//app.use(express.cookieParser());
app.use(session({
    secret: 'secret',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
 
// Passport:
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const localStrategyOptions = {
    usernameField: 'login',
    passwordField: 'password'
  }

/*
  passport.use(new LocalStrategy(options, (login, password, done) => {
    // check to see if the username exists
    const selectUserByLoginQuery = `SELECT * FROM user WHERE login = '${login}'`;
    const results = [];
    pg.connect(connectionString, (err, client, done)  => {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({success: false, data: err});
        }
        const query = client.query(selectUserByLoginQuery);
  
        query.on('row', (row) => {
          results.push(row);
        });
       
        query.on('end', () => {
          done();
          console.log(JSON.stringify(results));
          return JSON.stringify(results);
        });
    })
}))
*/

app.get("/main", function(request, response){
        
    response.send("<h1>Главная страница</h1>");
});

/**
 * SHOW_ALL_USERS
 */

  const router = express.Router();

  const selectUsersQuery = 'SELECT * FROM users ORDER BY id ASC;';
  const selectAllPokemonsQuery = 'SELECT * FROM pokemons ORDER BY id ASC;';
  app.get(ROUTES.SHOW_ALL_USERS,  (req, res, next) => {
    
    const results = [];
    
    pg.connect(connectionString, (err, client, done)  => {
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      const query = client.query(selectUsersQuery);

      query.on('row', (row) => {
        results.push(row);
      });
     
      query.on('end', () => {
        done();
        return res.json(results);
      });
    });
    
    //return res.json(results);
  }
);

/**
 * SHOW_ALL_POKEMONS
 */

app.get(ROUTES.SHOW_ALL_POKEMONS,  (req, res, next) => {
    
    const results = [];
    
    pg.connect(connectionString, (err, client, done)  => {
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      const query = client.query(selectAllPokemonsQuery);

      query.on('row', (row) => {
        results.push(row);
      });
     
      query.on('end', () => {
        done();
        return res.json(results);
      });
    });
  });

/**
 * REGISTRATION
 */

  app.post(ROUTES.REGISTRATION, (req, res, next) => {
    const results = [];
    const {login , password} = req.body;
    const hash = bcrypt.hashSync(password, 10);
    let currentId;
   
    pg.connect(connectionString, (err, client, done) => {
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      const insertQuery = {
        text: 'INSERT INTO users(login, password) values($1,$2)',
        values: [`${login}`,`${hash}`],
      }

      client.query(insertQuery);
      const query = client.query('SELECT * FROM users ORDER BY id ASC');
      query.on('row', (row) => {
        results.push(row);
      });
      query.on('end', () => {
        done();
        return res.json(results);
      });
    }); 
    //res.send(req.body);
  });

  
app.get('/login', function (req, res) {
    if (!req.query.login || !req.query.password) {
      res.send('login failed');    
    } else if(req.query.login == findOne(req.query.login)) {
      //console.log(findOne(req.query.login)) ;
      req.session.user = "user";
      res.send("login success!");
    }
    else {
        console.log('result: '  + findOne(req.query.login));
        res.send("login failed!");
    }
  });
   
  
  app.get('/logout', function (req, res) {
    req.session.destroy();
    res.send("logout success!");
  });
   
 
  app.get('/content', auth, function (req, res) {
      res.send("You can only see this after you've logged in.");
  });

app.listen(5000);