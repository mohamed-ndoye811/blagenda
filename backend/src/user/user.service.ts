import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.email || !createUserDto.password) {
      throw new ConflictException('Email and password are required');
    }
    const hashedPassword = await hash(createUserDto.password);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: hashedPassword,
          username: createUserDto.username,
          firstname: createUserDto.firstname,
          lastname: createUserDto.lastname,
        },
      });

      return plainToInstance(CreateUserDto, newUser, {
        excludeExtraneousValues: true,
      });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ConflictException('Invalid registration credentials');
        }
      }
    }
  }

  findAll() {
    return this.prisma.user.findMany({
      omit: {
        password: true,
        resetPasswordToken: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      omit: {
        password: true,
        resetPasswordToken: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          email: updateUserDto.email,
          username: updateUserDto.username,
          firstname: updateUserDto.firstname,
          lastname: updateUserDto.lastname,
          avatarURL: updateUserDto.avatarURL,
        },
      });

      return plainToInstance(UpdateUserDto, updatedUser, {
        excludeExtraneousValues: true,
      });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ConflictException('Invalid registration credentials');
        }
      }
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ConflictException('Invalid registration credentials');
        }
      }
    }

    return `User deleted successfully`;
  }
}
