import { registerAs } from '@nestjs/config';

export const config = registerAs('config', () => ({
  ENV: process.env.NODE_ENV || 'env',
  apiKey: process.env.API_KEY,
  api: {
    port: process.env.PORT || 4000,
  },
  mongo: {
    dbLocal: process.env.DB_LOCAL,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
  },
  cloudinaryEnv: {
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.CLOUD_API_KEY,
    apiSecret: process.env.CLOUD_SECRET,
  },
}));
