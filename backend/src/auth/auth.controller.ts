import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: { email: string; password: string }) {
    const user = await this.authService.login(
      signInDto.email,
      signInDto.password,
    );

    return {
      message: 'Login successful',
      code: 'login_success',
      auth_token: user.access_token,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body()
    registerDTO: CreateUserDto,
  ) {
    const user = await this.authService.register(registerDTO);

    return {
      message: 'Login successful',
      code: 'login_success',
      auth_token: user.access_token,
    };
  }
}
