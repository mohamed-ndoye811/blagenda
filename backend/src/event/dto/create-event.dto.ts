import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsUUID,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsObject,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    description: "Identifiant unique de l'événement.",
    example: 'a0b1c2d3-e4f5-6789-0123-456789abcdef',
    format: 'uuid',
  })
  @IsUUID()
  @IsOptional() // Pas requis en création
  id?: string;

  @ApiProperty({
    description: "Titre de l'événement.",
    example: 'Réunion hebdomadaire',
    maxLength: 75,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(75)
  title: string;

  @ApiProperty({
    description: "Description courte de l'événement.",
    example: "Réunion d'équipe pour faire le point sur les tâches en cours.",
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @ApiProperty({
    description: "Liste de tags associés à l'événement.",
    example: ['projet', 'réunion'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({
    description:
      "Valeurs des options dynamiques configurées via le type d'événement.",
    example: {
      location: 'Paris',
      priority: 'Haute',
      participants: ['alice@example.com', 'bob@example.com'],
    },
    type: Object,
  })
  @IsObject()
  @IsNotEmpty()
  optionsValues: Record<string, any>;

  @ApiProperty({
    description: "Identifiant du type d'événement.",
    example: 'd4c3b2a1-9876-5432-10fe-dcba98765432',
    format: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  typeId: string;
}
