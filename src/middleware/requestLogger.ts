import pinoHttp from 'pino-http';
import type { IncomingMessage, ServerResponse } from 'http';
import logger from '../logger';

export const requestLogger = pinoHttp({
  logger,
  customLogLevel: function (req: any, res: any, err?: any) {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
});
