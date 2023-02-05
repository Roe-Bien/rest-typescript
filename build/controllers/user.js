"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../config/logger"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const signJWT_1 = __importDefault(require("../functions/signJWT"));
const NAMESPACE = 'User';
const validateToken = (req, res, next) => {
    logger_1.default.info(NAMESPACE, 'Token validated, user authenticated');
    return res.status(200).json({
        message: 'authenticated',
    });
};
const register = (req, res, next) => {
    let { username, password } = req.body;
    bcryptjs_1.default.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(401).json({
                message: hashError.message,
                error: hashError,
            });
        }
        // Insert user to DB
        const _user = new user_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            username,
            password: hash,
        });
        return _user
            .save()
            .then((user) => {
            return res.status(201).json({
                user,
            });
        })
            .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error,
            });
        });
    });
};
const login = (req, res, next) => {
    let { username, password } = req.body;
    user_1.default.find({ username })
        // .select('-password')
        .exec()
        .then((users) => {
        if (users.length !== 1) {
            return res.status(401).json({
                message: 'unauthorized',
            });
        }
        bcryptjs_1.default.compare(password, users[0].password, (error, result) => {
            if (error) {
                logger_1.default.error(NAMESPACE, error.message, error);
                return res.status(401).json({
                    message: 'Wrong password',
                });
            }
            else if (result) {
                (0, signJWT_1.default)(users[0], (_error, token) => {
                    if (_error) {
                        logger_1.default.error(NAMESPACE, 'Unable to sign token: ', _error);
                        return res.status(401).json({
                            message: 'unauthorized',
                        });
                    }
                    else if (token) {
                        return res.status(200).json({
                            message: 'Account authorized',
                            token,
                            user: users[0],
                            delete: users[0].password,
                        });
                    }
                });
            }
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error,
        });
    });
};
const getAllUsers = (req, res, next) => {
    user_1.default.find()
        .select('-password')
        .exec()
        .then((users) => {
        return res.status(200).json({
            users,
            count: users.length,
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error,
        });
    });
};
exports.default = { validateToken, register, login, getAllUsers };
