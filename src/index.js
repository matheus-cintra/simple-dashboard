import { config } from 'dotenv';

import server from './app/server';

config();

const { PORT } = process.env;
server.listen(PORT, () => {
  console.log(`Connected at http://localhost:${PORT}`);
});
