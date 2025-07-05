import { ConflictException, Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { DRIZZLE } from '../drizzle/drizzle.module';
import { users } from '../../database/user.entity';
import { eq } from 'drizzle-orm';
import { hash } from 'argon2';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema } from '../../database/schema';

interface DatabaseError {
  code?: string;
  message?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.email || !createUserDto.password) {
      throw new ConflictException('Email and password are required');
    }

    const hashedPassword = await hash(createUserDto.password);

    try {
      const newUser = await this.db
        .insert(users)
        .values({
          email: createUserDto.email,
          password: hashedPassword,
          username: createUserDto.username,
          firstname: createUserDto.firstname,
          lastname: createUserDto.lastname,
        })
        .returning();

      return newUser[0];
    } catch (error) {
      const err = error as DatabaseError;
      // Pour PostgreSQL, erreur de contrainte unique
      if (err.code === '23505') {
        throw new ConflictException('Invalid registration credentials');
      }
      throw error;
    }
  }

  async findAll() {
    return this.db
      .select({
        id: users.id,
        email: users.email,
        firstname: users.firstname,
        lastname: users.lastname,
        username: users.username,
        avatarURL: users.avatarURL,
        role: users.role,
        verified: users.verified,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users);
  }

  async findOne(id: string) {
    const result = await this.db
      .select({
        id: users.id,
        email: users.email,
        firstname: users.firstname,
        lastname: users.lastname,
        username: users.username,
        avatarURL: users.avatarURL,
        role: users.role,
        verified: users.verified,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, id));

    return result[0];
  }

  async findByEmail(email: string) {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return result[0];
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.db
        .update(users)
        .set({
          email: updateUserDto.email,
          username: updateUserDto.username,
          firstname: updateUserDto.firstname,
          lastname: updateUserDto.lastname,
          avatarURL: updateUserDto.avatarURL,
        })
        .where(eq(users.id, id))
        .returning();

      return plainToInstance(UpdateUserDto, updatedUser[0], {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      const err = error as DatabaseError;
      if (err.code === '23505') {
        throw new ConflictException('Invalid registration credentials');
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.db.delete(users).where(eq(users.id, id));
    } catch (error) {
      const err = error as DatabaseError;
      if (err.code === '23505') {
        throw new ConflictException('Invalid registration credentials');
      }
      throw error;
    }

    return `User deleted successfully`;
  }
}
