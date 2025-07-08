import { type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eventTypes, type InsertEventType } from '../event-type.entity';
import { faker } from '@faker-js/faker';

export async function seedEventTypes(db: NodePgDatabase<any>) {
  console.log('🌱 Seeding event types...');

  const eventTypesData: InsertEventType[] = [
    {
      title: 'Conference',
      description: 'Professional conference or seminar',
      tags: ['business', 'networking', 'professional'],
      options: {
        maxAttendees: 100,
        requiresApproval: true,
        allowsCancellation: true,
      },
    },
    {
      title: 'Workshop',
      description: 'Interactive workshop or training session',
      tags: ['education', 'hands-on', 'learning'],
      options: {
        maxAttendees: 20,
        requiresApproval: false,
        allowsCancellation: true,
      },
    },
    {
      title: 'Social Event',
      description: 'Casual social gathering or party',
      tags: ['social', 'fun', 'casual'],
      options: {
        maxAttendees: 50,
        requiresApproval: false,
        allowsCancellation: true,
      },
    },
    {
      title: 'Meeting',
      description: 'Formal business meeting',
      tags: ['business', 'formal', 'meeting'],
      options: {
        maxAttendees: 15,
        requiresApproval: true,
        allowsCancellation: false,
      },
    },
  ];

  // Add some random event types
  for (let i = 0; i < 6; i++) {
    eventTypesData.push({
      title: faker.company.buzzPhrase(),
      description: faker.lorem.sentence(),
      tags: faker.helpers.arrayElements(
        ['tech', 'business', 'social', 'education', 'sports', 'art'],
        { min: 1, max: 3 },
      ),
      options: {
        maxAttendees: faker.number.int({ min: 10, max: 200 }),
        requiresApproval: faker.datatype.boolean(),
        allowsCancellation: faker.datatype.boolean(),
      },
    });
  }

  await db.insert(eventTypes).values(eventTypesData);
  console.log(`✅ Seeded ${eventTypesData.length} event types`);
}
