import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  controllers: [AuthController],
  providers: [PrismaService, AuthService, UsersService],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
