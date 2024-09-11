import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../person/entities/person.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // Asegúrate de que el ConfigModule esté importado para manejar variables de entorno
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Person], // Añade aquí tus entidades
        synchronize: true, // Cambia a false en producción
        autoLoadEntities: true, // Cambia a false en producción
        options: {
          encrypt: true, // Usa cifrado para conexiones a SQL Server
          trustServerCertificate: true
        },
      }),
    }),
  ],
})
export class DatabaseModule { }

