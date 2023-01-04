"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../config/logger"));
const NAMESPACE = 'Sample Controller';
const healthCheck = (req, res, next) => {
    logger_1.default.info(NAMESPACE, `Health Check`);
    return res.status(200).json({
        message: 'ping check',
    });
    next();
};
exports.default = { healthCheck };
