import { AuthService } from './core/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CredentialsDto } from './core/auth/dto/credentials.dto';
import { ChangePasswordDto } from './core/auth/dto/change-password.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException({ reason: error.detail }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('me')
  async me(@Headers('authorization') authToken) {
    try {
      const token = authToken.split('Bearer ')[1];
      return await this.authService.validateToken(token);
    } catch (error) {
      return { code: error.code, detail: error.detail };
    }
  }

  @Patch('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    try {
      return await this.authService.changePassword(changePasswordDto);
    } catch (error) {
      return { code: error.code, detail: error.detail };
    }
  }

  @Post('sign-in')
  async signIn(@Body() credentialsDto: CredentialsDto) {
    try {
      const token = await this.authService.signIn(credentialsDto);
      return { token };
    } catch (error) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos');
    }
  }

  @Post('populate')
  async populateDb() {
    try {
      const result = await this.appService.populateDb();
      return result;
    } catch (error) {
      throw new HttpException({ reason: error.detail }, HttpStatus.BAD_REQUEST);
    }
  }
}
