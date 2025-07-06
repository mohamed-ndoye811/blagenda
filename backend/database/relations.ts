import { relations } from 'drizzle-orm';
import { eventTypes } from './event-type.entity';
import { events } from './event.entity';
import { itemTypes } from './item-type.entity';
import { items } from './item.entity';

// Relations EventType -> Event
export const eventTypesRelations = relations(eventTypes, ({ many }) => ({
  events: many(events),
}));

export const eventsRelations = relations(events, ({ one }) => ({
  type: one(eventTypes, {
    fields: [events.typeId],
    references: [eventTypes.id],
  }),
}));

// Relations ItemType -> Item
export const itemTypesRelations = relations(itemTypes, ({ many }) => ({
  items: many(items),
}));

export const itemsRelations = relations(items, ({ one }) => ({
  itemType: one(itemTypes, {
    fields: [items.itemTypeId],
    references: [itemTypes.id],
  }),
}));
