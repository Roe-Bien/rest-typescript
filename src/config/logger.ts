import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:mm:dd:yyyy HH:MM',
      ignore: 'pid,hostname',
    },
  },
});

const info = (namespace: string, message: string, object?: any) => {
  if (object) {
    logger.info(`[${namespace}] ${message}`, object);
  } else {
    logger.info(`[${namespace}] ${message} `);
  }
};

const warn = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.warn(`[${namespace}] ${message} `, object);
  } else {
    console.warn(`[${namespace}] ${message} `);
  }
};

const error = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.error(`[${namespace}] ${message} `, object);
  } else {
    console.error(`[${namespace}] ${message} `);
  }
};

// const debug = (namespace: string, message: string, object?: any) => {
//   if (object) {
//     console.debug(`[${getTimestamp()}] [DEBUG] [${namespace}] ${message} `, object);
//   } else {
//     console.debug(`[${getTimestamp()}] [DEBUG] [${namespace}] ${message} `);
//   }
// };

export default {
  info,
  warn,
  error,
  // debug,
  logger,
};
