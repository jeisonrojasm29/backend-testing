import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [PersonModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
