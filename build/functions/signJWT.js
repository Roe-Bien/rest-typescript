"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const logger_1 = __importDefault(require("../config/logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const NAMESPACE = 'Auth';
const signJWT = (user, callback) => {
    var timeSinceEpoch = new Date().getTime(); // return time (Trivia: January 1, 1970 is Unix epoch)
    var expirationTime = timeSinceEpoch + Number(config_1.default.server.token.expiration) * 100000; // return time in milliseconds
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    logger_1.default.info(NAMESPACE, `Attempting to sign token for ${user.username}`);
    try {
        jsonwebtoken_1.default.sign({
            username: user.username,
        }, config_1.default.server.token.secret, {
            issuer: config_1.default.server.token.issuer,
            algorithm: 'HS256',
            expiresIn: expirationTimeInSeconds,
        }, (error, token) => {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
            }
        });
    }
    catch (error) {
        logger_1.default.error(NAMESPACE, error.message, error);
        callback(error, null);
    }
};
exports.default = signJWT;
