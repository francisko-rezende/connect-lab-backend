import { AuthService } from './core/auth/auth.service';
import { appProviders } from './app.providers';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './core/database/database.providers';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '6h',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ...databaseProviders, ...appProviders, AuthService],
})
export class AppModule {}
