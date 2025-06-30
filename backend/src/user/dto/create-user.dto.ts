import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  @ApiProperty({
    default: 'john.doe@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Exclude()
  @ApiProperty({
    default: '1234',
  })
  password: string;

  @IsString()
  @ApiProperty()
  @Expose()
  username: string;

  @IsString()
  @ApiProperty()
  @Expose()
  firstname: string;

  @IsString()
  @ApiProperty()
  @Expose()
  lastname: string;
}
