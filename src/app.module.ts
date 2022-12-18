import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './core/database/database.providers';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders],
})
export class AppModule {}
