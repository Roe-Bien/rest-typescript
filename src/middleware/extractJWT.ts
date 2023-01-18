import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import config from '../config/config';
import jwt from 'jsonwebtoken';

const NAMESPACE = 'Auth';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  logger.info(NAMESPACE, 'validating token');

  // Split the bearer and token, then get the token
  let token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, config.server.token.secret, (error, decoded) => {
      if (error) {
        return res.status(404).json({
          message: error.message,
          error,
        });
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: 'unauthorized',
    });
  }
};

export default extractJWT;
