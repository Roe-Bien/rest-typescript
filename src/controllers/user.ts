import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import bcryptjs from 'bcryptjs';
import User from '../models/user';
import mongoose from 'mongoose';
import signJWT from '../functions/signJWT';

const NAMESPACE = 'User';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  logger.info(NAMESPACE, 'Token validated, user authenticated');

  return res.status(200).json({
    message: 'authenticated',
  });
};

const register = (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  bcryptjs.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      return res.status(401).json({
        message: hashError.message,
        error: hashError,
      });
    }
    // Insert user to DB
    const _user = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      password: hash,
    });

    return _user
      .save()
      .then((user: any) => {
        return res.status(201).json({
          user,
        });
      })
      .catch((error: any) => {
        return res.status(500).json({
          message: error.message,
          error,
        });
      });
  });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  User.find({ username })
    // .select('-password')
    .exec()
    .then((users) => {
      if (users.length !== 1) {
        return res.status(401).json({
          message: 'unauthorized',
        });
      }

      bcryptjs.compare(password, users[0].password, (error, result) => {
        if (error) {
          logger.error(NAMESPACE, error.message, error);

          return res.status(401).json({
            message: 'Wrong password',
          });
        } else if (result) {
          signJWT(users[0], (_error, token) => {
            if (_error) {
              logger.error(NAMESPACE, 'Unable to sign token: ', _error);

              return res.status(401).json({
                message: 'unauthorized',
              });
            } else if (token) {
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

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find()
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

export default { validateToken, register, login, getAllUsers };
