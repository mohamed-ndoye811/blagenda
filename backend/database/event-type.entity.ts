import { pgTable, uuid, varchar, json } from 'drizzle-orm/pg-core';

// Table event_types
export const eventTypes = pgTable('event_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 75 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  tags: varchar('tags', { length: 50 }).array().notNull().default([]),
  options: json('options').notNull(),
});

// Type pour l'insertion
export type InsertEventType = typeof eventTypes.$inferInsert;

// Type pour la sélection
export type SelectEventType = typeof eventTypes.$inferSelect;
