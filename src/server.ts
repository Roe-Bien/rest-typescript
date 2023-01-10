import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import config from './config/config';
import logger from './config/logger';
import book from './routes/book';
import mongoose from 'mongoose';

const NAMESPACE = 'Server';
const app = express();

/**Connect to MongoDB */
mongoose.set('strictQuery', false);
mongoose
  .connect(config.mongo.uri, config.mongo.options)
  .then((result) => {
    logger.info(NAMESPACE, `Connected to Database`);
  })
  .catch((error) => {
    logger.error(NAMESPACE, error.message, error);
  });

/**Logging the Request */
app.use((req, res, next) => {
  logger.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logger.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
  });

  next();
});

/**Parse the Request */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**Rules of our API */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET POST DELETE PATCH PUT');
    return res.status(200).json({});
  }
  next();
});

/**Routing */
app.use(book);

/**Route Error Handling */
app.use((req, res, next) => {
  const error = new Error('route not found');

  return res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => logger.info(NAMESPACE, `Server running on port ${config.server.hostname}: ${config.server.port}`));
