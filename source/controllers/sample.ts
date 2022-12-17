import { json } from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

const NAMESPACE = 'Sample Controller';

const healthCheck = (req: Request, res: Response, next: NextFunction) => {
  logger.info(NAMESPACE, `Health Check`);

  return res.status(200).json({
    message: 'ping check',
  });
};

export default { healthCheck };
