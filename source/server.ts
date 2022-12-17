import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import config from './config/config';
import logger from './config/logger';
import sample from './routes/sample';

const NAMESPACE = 'Server';
const router = express();

/**Logging the Request */
router.use((req, res, next) => {
  logger.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logger.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
  });

  next();
});

/**Parse the Request */
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**Rules of our API */
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET POST DELETE PATCH PUT');
    return res.status(200).json({});
  }
  next();
});

/**Routing */
router.use(sample);

/**Route Error Handling */
router.use((req, res, next) => {
  const error = new Error('route not found');

  return res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logger.info(NAMESPACE, `Server running on port ${config.server.hostname}: ${config.server.port}`));
