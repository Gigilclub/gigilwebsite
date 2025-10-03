// gigil/giftgpt/backend/strapi/config/env/production/database.ts

import { parse } from 'pg-connection-string';
import { type DatabaseConfig } from '@strapi/database/lib/types';

export default ({ env }: { env: (key: string, defaultValue?: any) => any }): DatabaseConfig => {
  // Get the database URL we set on the Render dashboard
  const databaseUrl = env('DATABASE_URL');
  const config = parse(databaseUrl);

  return {
    connection: {
      client: 'postgres',
      connection: {
        host: config.host,
        port: config.port,
        database: config.database,
        user: config.user,
        password: config.password,
        ssl: {
          rejectUnauthorized: false,
        },
      },
      debug: false,
    },
  };
};