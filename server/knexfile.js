export default {
  development: {
    client: 'sqlite3',
    connection: { filename: './db/dev.sqlite3' },
    useNullAsDefault: true,
    migrations: { directory: './migrations' },
    seeds: { directory: './seeds' }
  },
  test: {
    client: 'sqlite3',
    connection: { filename: './db/test.sqlite3' },
    useNullAsDefault: true,
    migrations: { directory: './migrations' },
    seeds: { directory: './seeds' }
  },
  // Optional production profile using PostgreSQL. Set NODE_ENV=production
  // and provide connection details via environment variables.
  production: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST || 'localhost',
      port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
      database: process.env.PG_DATABASE || 'vacations',
      user: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD || ''
      // ssl: { rejectUnauthorized: false } // enable if required by your host
    },
    pool: { min: 2, max: 10 },
    migrations: { directory: './migrations' },
    seeds: { directory: './seeds' }
  }
};
