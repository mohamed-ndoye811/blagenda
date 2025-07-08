import { pgTable, uuid, varchar, json, timestamp } from 'drizzle-orm/pg-core';
import { eventTypes } from './event-type.entity';

// Table events
export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 75 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  tags: varchar('tags', { length: 50 }).array().notNull().default([]),
  optionsValues: json('optionsValues').notNull(),
  typeId: uuid('typeId')
    .notNull()
    .references(() => eventTypes.id),

  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt'),
});

// Type pour l'insertion
export type InsertEvent = typeof events.$inferInsert;

// Type pour la sélection
export type SelectEvent = typeof events.$inferSelect;
