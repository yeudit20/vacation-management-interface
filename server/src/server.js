import app from './app.js';
import { db } from './db/knex.js';

const port = process.env.PORT || 3001;

async function start() {
  try {
    // Touch DB to ensure it initializes
    await db.raw('select 1 as ok');
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (e) {
    console.error('Failed to start server:', e);
    process.exit(1);
  }
}

start();

