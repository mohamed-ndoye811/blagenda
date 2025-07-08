import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
  MaxLength,
  IsObject,
} from 'class-validator';

export class CreateEventTypeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(75)
  @Expose()
  @ApiProperty({
    description: 'Title of the event type',
    example: 'Meeting',
    maxLength: 75,
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @Expose()
  @ApiProperty({
    description: 'Description of the event type',
    example: 'Business meeting with clients',
    maxLength: 255,
  })
  description: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(50, { each: true })
  @Expose()
  @ApiProperty({
    description: 'Tags associated with the event type',
    example: ['business', 'important'],
    type: [String],
    required: false,
    default: [],
  })
  tags?: string[];

  @IsNotEmpty()
  @IsObject()
  @Expose()
  @ApiProperty({
    description: 'Configuration options for the event type',
    example: {
      color: '#3498db',
      duration: 60,
      reminders: [15, 30],
      allowGuests: true,
    },
  })
  options: Record<string, any>;
}
