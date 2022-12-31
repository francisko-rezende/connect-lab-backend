import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.appService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException({ reason: error.detail }, HttpStatus.BAD_REQUEST);
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
