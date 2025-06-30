import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional, IsUrl } from 'class-validator';
import { Expose } from 'class-transformer';
import { UserRole } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsUrl()
  @Expose()
  @ApiProperty({
    default: 'john.doe@gmail.com',
  })
  avatarURL: string;

  @IsEnum(UserRole)
  @Expose()
  @ApiProperty({
    default: 'john.doe@gmail.com',
  })
  role: string;
}
