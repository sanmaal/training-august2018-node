import { SERVERPORT } from './app/config/config'
import app from './app/app';

const port = SERVERPORT || 3000;

const server = app.listen(port, () => (
  console.log(`EXPRESS listening on port ${port}`)
));
