import logger from 'jet-logger';

import EnvVars from '@src/common/EnvVars';
import server from './server';


// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: ' +
    EnvVars.Port.toString());

// Force IPv4 only to ensure fail2ban works correctly
const port = Number(EnvVars.Port) || 8083;
server.listen(port, '0.0.0.0', () => {
  console.log(SERVER_START_MSG);
  logger.info(SERVER_START_MSG);
});
