import { eventTypes } from './../../database/event-type.entity';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { schema } from 'database/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { eq } from 'drizzle-orm';

@Injectable()
export class EventTypeService {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createEventTypeDto: CreateEventTypeDto) {
    // Check if the event type already exists
    const existingEventType = await this.db
      .select()
      .from(eventTypes)
      .where(eq(eventTypes.title, createEventTypeDto.title))
      .execute();

    if (existingEventType.length > 0) {
      throw new ConflictException('Event type already exists');
    }

    // Insert the new event type
    try {
      const event = await this.db
        .insert(eventTypes)
        .values(createEventTypeDto)
        .returning();

      return {
        ...event,
      };
    } catch (error) {
      const err = error as { code?: string; message?: string };
      // Handle specific database errors, e.g., unique constraint violations
      if (err.code === '23505') {
        throw new ConflictException('Event type already exists');
      }
      throw error; // Re-throw other errors
    }
  }

  async findAll() {
    // Fetch all event types from the database
    const eventTypesList = await this.db.select().from(eventTypes).execute();

    if (!eventTypesList || eventTypesList.length === 0) {
      return [];
    }

    // Return the list of event types
    return eventTypesList;
  }

  async findOne(id: string) {
    const event = await this.db
      .select()
      .from(eventTypes)
      .where(eq(eventTypes.id, id))
      .execute();

    if (!event || event.length === 0) {
      return null;
    }

    return event;
  }

  async update(id: string, updateEventTypeDto: UpdateEventTypeDto) {
    const existingEventType = await this.db
      .select()
      .from(eventTypes)
      .where(eq(eventTypes.id, id))
      .execute();

    if (!existingEventType || existingEventType.length === 0) {
      throw new ConflictException('Event type not found');
    }

    // Update the event type
    const updatedEventType = await this.db
      .update(eventTypes)
      .set(updateEventTypeDto)
      .where(eq(eventTypes.id, id))
      .returning();

    return updatedEventType;
  }

  async remove(id: string) {
    // Remove the event type by ID
    try {
      await this.db.delete(eventTypes).where(eq(eventTypes.id, id)).execute();
      return { message: 'Event type deleted successfully' };
    } catch {
      throw new ConflictException('Event type not found');
    }
  }
}
