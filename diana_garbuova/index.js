const server = require('./server');

server()
  .then((port) => console.log(`Server is started on port: ${port}`))
  .catch((err) => console.error(`Server is down: ${err}`));