import pino from 'pino';
import { config } from './config/env';

const isProd = config.nodeEnv === 'production';

const logger = pino({
  level: config.logLevel,
  transport: !isProd
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          singleLine: false,
        },
      }
    : undefined,
});

export default logger;
