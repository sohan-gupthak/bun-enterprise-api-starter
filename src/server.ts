import { createApp } from './app';
import { config } from './config/env';
import logger from './logger';

const app = createApp();

app.listen(config.port, () => {
  logger.info(
    { port: config.port, env: config.nodeEnv },
    'API server listening',
  );
  logger.info(`Swagger UI available at localhost:${config.port}/docs`);
});
