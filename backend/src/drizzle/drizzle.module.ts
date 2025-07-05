import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { schema } from '../../database/schema';

export const DRIZZLE = Symbol('drizzle-connection');

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connectionString =
          configService.get<string>('DATABASE_URL') ||
          'postgresql://localhost:5432/blagenda';

        // Utilisation de la vraie chaîne de connexion pour drizzle
        return drizzle(connectionString, { schema });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
