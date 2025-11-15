import dotenv from 'dotenv';

// Load environment variables from .env if present
dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  logLevel: process.env.LOG_LEVEL ?? 'info',
  // Must match tsoa.json basePath
  apiBasePath: '/api',
};

export type AppConfig = typeof config;
