"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const logger_1 = __importDefault(require("./config/logger"));
const user_1 = __importDefault(require("./routes/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const NAMESPACE = 'Server';
const app = (0, express_1.default)();
/**Connect to MongoDB */
mongoose_1.default.set('strictQuery', false);
mongoose_1.default
    .connect(config_1.default.mongo.uri, config_1.default.mongo.options)
    .then((result) => {
    logger_1.default.info(NAMESPACE, `Connected to Database`);
})
    .catch((error) => {
    logger_1.default.error(NAMESPACE, error.message, error);
});
/** Request Logging */
app.use((req, res, next) => {
    logger_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logger_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});
/**Parse the Request */
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
/**API rules */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET POST DELETE PATCH PUT');
        return res.status(200).json({});
    }
    next();
});
/**Routes */
app.use(user_1.default);
/**Route Error Handling */
app.use((req, res, next) => {
    const error = new Error('route not found');
    return res.status(404).json({
        message: error.message,
    });
});
// Create and Listen to Server
const httpServer = http_1.default.createServer(app);
httpServer.listen(config_1.default.server.port, () => logger_1.default.info(NAMESPACE, `Server running on port ${config_1.default.server.hostname}: ${config_1.default.server.port}`));
