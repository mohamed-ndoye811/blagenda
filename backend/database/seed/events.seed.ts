import { type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { events, type InsertEvent } from '../event.entity';
import { eventTypes } from '../event-type.entity';
import { faker } from '@faker-js/faker';

export async function seedEvents(db: NodePgDatabase<any>) {
  console.log('🌱 Seeding events...');

  // Get all event types first
  const allEventTypes = await db.select({ id: eventTypes.id }).from(eventTypes);

  if (allEventTypes.length === 0) {
    console.log('⚠️  No event types found, skipping events seeding');
    return;
  }

  const eventsData: InsertEvent[] = [];

  // Create events for each event type
  for (const eventType of allEventTypes) {
    // Create 2-4 events per event type
    const numberOfEvents = faker.number.int({ min: 2, max: 4 });

    for (let i = 0; i < numberOfEvents; i++) {
      eventsData.push({
        title: faker.company.buzzPhrase(),
        description: faker.lorem.sentence(),
        tags: faker.helpers.arrayElements(
          ['tech', 'business', 'social', 'education', 'sports', 'art'],
          { min: 1, max: 3 },
        ),
        optionsValues: {
          location: faker.location.city(),
          startDate: faker.date.future(),
          endDate: faker.date.future(),
          isOnline: faker.datatype.boolean(),
          price: faker.number.int({ min: 0, max: 200 }),
        },
        typeId: eventType.id,
      });
    }
  }

  await db.insert(events).values(eventsData);
  console.log(`✅ Seeded ${eventsData.length} events`);
}
