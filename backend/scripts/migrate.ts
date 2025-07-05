import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { schema } from '../database/schema';

async function runMigrations() {
  const connectionString =
    process.env.DATABASE_URL || 'postgresql://localhost:5432/blagenda';
  const db = drizzle(connectionString, { schema });

  console.log('🔄 Running Drizzle migrations...');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('✅ Migrations completed!');
}

if (require.main === module) {
  runMigrations().catch(console.error);
}
