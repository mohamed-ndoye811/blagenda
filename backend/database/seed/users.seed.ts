import { type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { users, type InsertUser } from '../user.entity';
import { faker } from '@faker-js/faker';
import * as argon2 from 'argon2';

export async function seedUsers(db: NodePgDatabase<any>) {
  console.log('🌱 Seeding users...');

  const hashedPassword = await argon2.hash('password123');

  const usersData: InsertUser[] = [
    {
      email: 'admin@example.com',
      password: hashedPassword,
      firstname: 'Admin',
      lastname: 'User',
      username: 'admin',
      role: 'ADMIN',
      verified: true,
    },
    {
      email: 'manager@example.com',
      password: hashedPassword,
      firstname: 'Manager',
      lastname: 'User',
      username: 'manager',
      role: 'MANAGER',
      verified: true,
    },
    {
      email: 'user@example.com',
      password: hashedPassword,
      firstname: 'Regular',
      lastname: 'User',
      username: 'user',
      role: 'USER',
      verified: true,
    },
  ];

  // Add some fake users
  for (let i = 0; i < 10; i++) {
    usersData.push({
      email: faker.internet.email(),
      password: hashedPassword,
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      username: faker.internet.userName(),
      role: faker.helpers.arrayElement(['USER', 'MANAGER']),
      verified: faker.datatype.boolean(),
      avatarURL: faker.image.avatar(),
    });
  }

  await db.insert(users).values(usersData);
  console.log(`✅ Seeded ${usersData.length} users`);
}
