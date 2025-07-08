import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { events, schema } from 'database/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { eq } from 'drizzle-orm';

@Injectable()
export class EventService {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    try {
      return await this.db
        .insert(events)
        .values({
          ...createEventDto,
        })
        .returning();
    } catch (error) {
      const err = error as { code?: string; message?: string };
      // Handle specific database errors, e.g., unique constraint violations
      if (err.code === '23505') {
        throw new ConflictException('Event already exists');
      }
      throw error; // Re-throw other errors
    }
  }

  async findAll() {
    const events = await this.db.query.events.findMany();
    return events;
  }

  async findOne(id: string) {
    try {
      const event = await this.db.query.events.findFirst({
        where: eq(events.id, id),
      });

      return event;
    } catch (error) {
      const err = error as { code?: string; message?: string };
      // Handle specific database errors, e.g., not found
      if (err.code === '23503') {
        throw new ConflictException('Event not found');
      }
      throw error; // Re-throw other errors
    }
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.db.query.events.findFirst({
      where: eq(events.id, id),
    });

    if (!event) {
      throw new ConflictException('Event not found');
    }
    try {
      const updatedEvent = await this.db
        .update(events)
        .set({
          ...updateEventDto,
        })
        .where(eq(events.id, id))
        .returning();

      return updatedEvent;
    } catch (error) {
      const err = error as { code?: string; message?: string };
      // Handle specific database errors, e.g., unique constraint violations
      if (err.code === '23505') {
        throw new ConflictException('Event update failed');
      }
      throw error; // Re-throw other errors
    }
  }

  remove(id: string) {
    const event = this.db.query.events.findFirst({
      where: eq(events.id, id),
    });

    if (!event) {
      throw new ConflictException('Event not found');
    }

    try {
      this.db.delete(events).where(eq(events.id, id));
      return { message: `Event ${id} deleted successfully` };
    } catch (error) {
      const err = error as { code?: string; message?: string };
      // Handle specific database errors, e.g., foreign key violations
      if (err.code === '23503') {
        throw new ConflictException(
          'Event cannot be deleted due to dependencies',
        );
      }
      throw error; // Re-throw other errors
    }
  }
}
