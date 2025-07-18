import { pgTable, uuid, varchar, json } from 'drizzle-orm/pg-core';

// Table item_types
export const itemTypes = pgTable('item_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug').notNull(),
  title: varchar('title', { length: 75 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  fields: json('fields').notNull(),
});

// Type pour l'insertion
export type InsertItemType = typeof itemTypes.$inferInsert;

// Type pour la sélection
export type SelectItemType = typeof itemTypes.$inferSelect;
