import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    if (!email && !pass) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await verify(user.password, pass);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(userInfos: CreateUserDto) {
    const { email, password: pass, confirm_password } = userInfos;

    if (!email || !pass || !confirm_password || !userInfos.username) {
      throw new UnauthorizedException('Invalid registration credentials');
    }

    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    if (pass !== confirm_password) {
      throw new UnauthorizedException('Passwords do not match');
    }

    const user = await this.usersService.create(userInfos);

    if (!user) {
      throw new UnauthorizedException('User registration failed');
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
