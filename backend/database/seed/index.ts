import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../schema';
import { seedUsers } from './users.seed';
import { seedEventTypes } from './event-types.seed';
import { seedEvents } from './events.seed';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgres://devuser:devpass@localhost:5433/devdb',
});

const db = drizzle(pool, { schema });

async function main() {
  console.log('🌱 Starting seeding...');

  try {
    // Seed users first (they might be referenced by other tables)
    await seedUsers(db);

    // Seed event types
    await seedEventTypes(db);

    // Seed events (depends on users and event types)
    await seedEvents(db);

    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

void main();
