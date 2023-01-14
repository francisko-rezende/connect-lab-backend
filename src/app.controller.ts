import { FindOneUserDeviceParamDto } from './dto/find-one-user-device-param.dto';
import { LocationQueryDto } from './dto/location-query.dto';
import { LinkDeviceDto } from './dto/link-device.dto';
import { AuthService } from './core/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CredentialsDto } from './core/auth/dto/credentials.dto';
import { ChangePasswordDto } from './core/auth/dto/change-password.dto';
import { JwtAuthGuard } from './core/auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const userCreatedMessage = await this.authService.createUser(
        createUserDto,
      );
      return { statusCode: HttpStatus.CREATED, message: userCreatedMessage };
    } catch (error) {
      throw new HttpException({ reason: error.detail }, HttpStatus.BAD_REQUEST);
    }
  }

  // @Get('me')
  // async me(@Headers('authorization') authToken) {
  //   try {
  //     const token = authToken.split('Bearer ')[1];
  //     return await this.authService.validateToken(token);
  //   } catch (error) {
  //     return { code: error.code, detail: error.detail };
  //   }
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('me2')
  // async me(@Request() request) {
  //   const {
  //     user: { userId, email, firstName },
  //   } = request;
  //   return { userId, email, firstName };
  // }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    try {
      await this.authService.changePassword(changePasswordDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Senha alterada com sucesso',
      };
    } catch (error) {
      if (!error) {
        throw new UnauthorizedException('E-mail e/ou senha incorretos');
      }
      return { code: error.code, detail: error.detail };
    }
  }

  @Post('sign-in')
  async signIn(@Body() credentialsDto: CredentialsDto) {
    try {
      const token = await this.authService.signIn(credentialsDto);
      return { token };
    } catch (error) {
      if (!error) {
        throw new UnauthorizedException('E-mail e/ou senha incorretos');
      }
      return { code: error.code, detail: error.detail };
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

  @UseGuards(JwtAuthGuard)
  @Post('user-device')
  async linkDevice(@Request() request, @Body() body: LinkDeviceDto) {
    try {
      const message = await this.appService.linkDevice(request.user, body);
      return { statusCode: HttpStatus.CREATED, message };
    } catch (error) {
      if (typeof error === 'string') {
        throw new HttpException(
          { statusCode: HttpStatus.BAD_REQUEST, message: error },
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException({ reason: error.detail }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-devices')
  async findAllUserDevices(
    @Request() request,
    @Query() locationQuery: LocationQueryDto,
  ) {
    try {
      const userDevices = await this.appService.findAllUserDevices(
        request.user,
        locationQuery,
      );
      return userDevices;
    } catch (error) {
      throw new HttpException({ reason: error.detail }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-devices/:userDeviceId')
  async findOneUserDevice(@Param() param: FindOneUserDeviceParamDto) {
    try {
      return await this.appService.findOneUserDevice(+param.userDeviceId);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
}
