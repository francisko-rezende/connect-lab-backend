import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtPayloadUser } from 'src/utils/jwt-payload-user';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const { password } = createUserDto;
        const newUser = this.userRepository.create(createUserDto);
        newUser.salt = await bcrypt.genSalt(14);
        newUser.password = await this.hashPassword(password, newUser.salt);
        await this.userRepository.save(newUser);
        resolve('Usuário criado com sucesso');
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  // validateToken(jwtToken: string) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       resolve(
  //         await this.jwtService.verify(jwtToken, { ignoreExpiration: false }),
  //       );
  //     } catch (error) {
  //       reject({
  //         code: 401,
  //         detail: 'Token inválido',
  //       });
  //     }
  //   });
  // }

  changePassword(changePasswordDto: ChangePasswordDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const credentials: CredentialsDto = {
          email: changePasswordDto.email,
          password: changePasswordDto.oldPassword,
        };

        const user = await this.checkCredentials(credentials);
        if (user === null) {
          reject(null);
          return;
        }
        user.password = await this.hashPassword(
          changePasswordDto.newPassword,
          user.salt,
        );
        await this.userRepository.save(user);
        resolve('Senha alterada com sucesso');
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  async signIn(credentialsDto: CredentialsDto): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.checkCredentials(credentialsDto);

        if (user === null) {
          reject(null);
          return;
        }

        const { userId, fullName, email } = user;
        const firstName = this.getFirstName(fullName);
        const jwtPayload: JwtPayloadUser = {
          userId,
          firstName,
          email,
        };
        resolve(this.jwtService.sign(jwtPayload));
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  async checkCredentials(credentialsDto: CredentialsDto) {
    const { email, password } = credentialsDto;
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (user && (await user.checkPassword(password))) {
      return user;
    }

    return null;
  }

  private hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  getFirstName(fullName: string) {
    const firstName = fullName.split(' ')[0];
    return firstName;
  }
}
