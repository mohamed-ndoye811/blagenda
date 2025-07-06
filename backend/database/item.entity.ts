import { pgTable, uuid, json } from 'drizzle-orm/pg-core';
import { itemTypes } from './item-type.entity';

// Table items
export const items = pgTable('items', {
  id: uuid('id').primaryKey().defaultRandom(),
  fieldsValues: json('fieldsValues').default({}).notNull(),
  itemTypeId: uuid('itemTypeId')
    .notNull()
    .references(() => itemTypes.id),
});

// Type pour l'insertion
export type InsertItem = typeof items.$inferInsert;

// Type pour la sélection
export type SelectItem = typeof items.$inferSelect;
