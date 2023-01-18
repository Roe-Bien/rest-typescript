import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import logger from '../config/logger';
import bcryptjs from 'bcryptjs';

const NAMESPACE = 'User';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  logger.info(NAMESPACE, 'Token validated, user authenticated');

  return res.status(200).json({
    message: 'authenticated',
  });
};

const register = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  bcryptjs.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      return res.status(500).json({
        message: hashError.message,
        error: hashError,
      });
    }
    // TODO: insert user into DB here
  });
};

const login = (req: Request, res: Response, next: NextFunction) => {};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {};

export default { validateToken, register, login, getAllUsers };
