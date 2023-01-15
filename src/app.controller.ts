import { ChangePasswordSuccessfulResponseDto } from './dto/change-password-successful-response.dto';
import { SignInSuccessfulResponseDto } from './dto/sign-in-successful-response.dto';
import { PopulateDbSuccessfulResponseDto } from './dto/populate-db-successful.response.dto';
import { ConflictErrorResponseDto } from './dto/conflict-error-response.dto';
import { CreatedSuccessfulResponseDto } from './dto/created-successful-response.dto';
import { FindOneUserDeviceParamDto } from './dto/find-one-user-device-param.dto';
import { LocationQueryDto } from './dto/location-query.dto';
import { LinkDeviceDto } from './dto/link-device.dto';
import { AuthService } from './core/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UnauthorizedErrorResponseDto } from './dto/unauthorized-error-response.dto';
import { FindOneUserResponseDto } from './dto/find-one-user-response.dto';
import { ErrorResponseDto } from './dto/error-reponse.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @ApiTags('Setup')
  @ApiOperation({
    summary: 'Endpoint created to populate the db with default data',
    description:
      'This endpoint is used to add the default devices and locations to the database. Please, run it the first time you setup the project.',
  })
  @ApiCreatedResponse({
    type: PopulateDbSuccessfulResponseDto,
  })
  @ApiOkResponse({
    type: PopulateDbSuccessfulResponseDto,
  })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Post('populate')
  async populateDb() {
    try {
      const { message, statusCode } = await this.appService.populateDb();
      return { message, statusCode };
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiTags('Auth')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: CredentialsDto })
  @ApiOkResponse({
    type: SignInSuccessfulResponseDto,
  })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorResponseDto })
  @Post('sign-in')
  async signIn(@Body() credentialsDto: CredentialsDto) {
    try {
      const token = await this.authService.signIn(credentialsDto);
      return { token };
    } catch (error) {
      if (!error) {
        throw new UnauthorizedException('Invalid email and/or password');
      }
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiTags('User')
  @ApiCreatedResponse({ type: CreatedSuccessfulResponseDto })
  @ApiConflictResponse({ type: ConflictErrorResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const userCreatedMessage = await this.authService.createUser(
        createUserDto,
      );
      const result: CreatedSuccessfulResponseDto = {
        statusCode: HttpStatus.CREATED,
        message: userCreatedMessage,
      };
      return result;
    } catch (error) {
      if (error.code == 23505)
        throw new HttpException(
          { message: error.detail, errorCode: HttpStatus.CONFLICT },
          HttpStatus.CONFLICT,
        );

      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiTags('User')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: FindOneUserResponseDto,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Get('user')
  async me(@Request() request) {
    try {
      return await this.appService.findOneUser(request.user);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiTags('User')
  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiOkResponse({
    type: ChangePasswordSuccessfulResponseDto,
  })
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    try {
      return await this.authService.changePassword(changePasswordDto);
    } catch (error) {
      if (!error) {
        throw new UnauthorizedException('Invalid email and/or password');
      }
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiTags('User devices')
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiCreatedResponse({ type: CreatedSuccessfulResponseDto })
  @ApiBearerAuth()
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

      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiTags('User devices')
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiBearerAuth()
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
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiTags('User devices')
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ type: UnauthorizedErrorResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @ApiBearerAuth()
  @Get('user-devices/:userDeviceId')
  async findOneUserDevice(@Param() param: FindOneUserDeviceParamDto) {
    try {
      return await this.appService.findOneUserDevice(+param.userDeviceId);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
}
