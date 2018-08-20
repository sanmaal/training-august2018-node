const {express,app,ROUTES,path,pg,connectionString,bodyParser,bcrypt, passport, session} = require("./config");
// Authentication and Authorization Middleware
const auth = function(req, res, next) {
  if (req.session && req.session.user == findOne(req.query.login))
    return next();
  else
    return res.sendStatus(401);
};
 


const findOne = async(login) => {
    const selectUserByLoginQuery = `SELECT * FROM users WHERE login = '${login}'`.replace(/["]+/g,'');
    const results = [];
    let i = 0;
    await pg.connect(connectionString, (err, client, done)  => {
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({success: false, data: err});
        }
        const query = client.query(selectUserByLoginQuery);
        //console.log(query);
        query.on('row', (row) => {
          results.push(row);
        });
       
        query.on('end', () => {
          done();
          return JSON.stringify(results);
        });
        return JSON.stringify(results);
    })
}


module.exports = {auth , findOne}