import { users } from './user.entity';
import { eventTypes } from './event-type.entity';
import { events } from './event.entity';
import { itemTypes } from './item-type.entity';
import { items } from './item.entity';
import './relations'; // Import des relations

// Export direct des tables pour Drizzle
export { users, eventTypes, events, itemTypes, items };

export const schema = {
  users,
  eventTypes,
  events,
  itemTypes,
  items,
};
export type Schema = typeof schema;
