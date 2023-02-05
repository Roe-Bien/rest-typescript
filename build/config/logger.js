"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
// Logger for better message handling during development
const logger = (0, pino_1.default)({
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'SYS:mm:dd:yyyy HH:MM',
            ignore: 'pid,hostname',
        },
    },
});
const info = (namespace, message, object) => {
    if (object) {
        logger.info(`[${namespace}] ${message}`, object);
    }
    else {
        logger.info(`[${namespace}] ${message}`);
    }
};
const warn = (namespace, message, object) => {
    if (object) {
        console.warn(`[${namespace}] ${message}`, object);
    }
    else {
        console.warn(`[${namespace}] ${message}`);
    }
};
const error = (namespace, message, object) => {
    if (object) {
        console.error(`[${namespace}] ${message}`, object);
    }
    else {
        console.error(`[${namespace}] ${message}`);
    }
};
// const debug = (namespace: string, message: string, object?: any) => {
//   if (object) {
//     console.debug(`[${getTimestamp()}] [DEBUG] [${namespace}] ${message} `, object);
//   } else {
//     console.debug(`[${getTimestamp()}] [DEBUG] [${namespace}] ${message} `);
//   }
// };
exports.default = {
    info,
    warn,
    error,
    // debug,
    logger,
};
