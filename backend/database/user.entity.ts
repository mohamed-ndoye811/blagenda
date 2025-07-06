import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';

// Enum pour le rôle utilisateur
export const userRoleEnum = pgEnum('UserRole', ['ADMIN', 'USER', 'MANAGER']);

// Table users
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),

  email: varchar('email').unique().notNull(),
  password: varchar('password').notNull(),
  hashedRT: varchar('hashedRT'),
  firstname: varchar('firstname', { length: 255 }),
  lastname: varchar('lastname', { length: 255 }),
  username: varchar('username', { length: 75 }),
  avatarURL: text('avatarURL'),
  role: userRoleEnum('role').default('USER'),
  verified: boolean('verified').default(false),
  resetPasswordToken: varchar('resetPasswordToken'),

  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt'),
});

// Type pour l'insertion
export type InsertUser = typeof users.$inferInsert;

// Type pour la sélection
export type SelectUser = typeof users.$inferSelect;
