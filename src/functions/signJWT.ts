import IUser from '../interfaces/user';
import config from '../config/config';
import logger from '../config/logger';
import jwt from 'jsonwebtoken';

const NAMESPACE = 'Auth';

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
  const timeSinceEpoch = new Date().getTime(); // return time (Trivia: January 1, 1970 is Unix epoch)
  const expirationTime = timeSinceEpoch + Number(config.server.token.expiration) * 100_000; // return time in milliseconds
  const expirationTimeInSeconds = Math.floor(expirationTime / 1_000);

  logger.info(NAMESPACE, `Attempting to sign token for ${user.username}`);

  try {
    jwt.sign(
      {
        username: user.username,
      },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: 'HS256',
        expiresIn: expirationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error: any) {
    logger.error(NAMESPACE, error.message, error);
    callback(error, null);
  }
};

export default signJWT;
