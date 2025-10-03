// gigil/giftgpt/backend/strapi/config/env/production/database.ts

import path from 'path'; // Needed for path operations
import { parse } from 'pg-connection-string'; // 👈 This is the missing import that fixes the TS2304 error

export default ({ env }: { env: (key: string, defaultValue?: any) => any }) => {
  // 1. Get the database URL we set on the Render dashboard
  const databaseUrl = env('DATABASE_URL');

  // 2. Parse the connection string into individual components (host, port, etc.)
  const config = parse(databaseUrl);

  return {
    connection: {
      client: 'postgres', // Force PostgreSQL client in production
      connection: {
        host: config.host,
        port: config.port,
        database: config.database,
        user: config.user,
        password: config.password,
        ssl: {
          // Essential for cloud providers like Render
          rejectUnauthorized: false,
        },
      },
      debug: false,
    },
  };
};