import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { password } = createUserDto;
        const newUser = this.userRepository.create(createUserDto);
        newUser.salt = await bcrypt.genSalt(14);
        newUser.password = await this.hashPassword(password, newUser.salt);
        const user: UserEntity = await this.userRepository.save(newUser);
        delete user.password;
        delete user.salt;
        resolve(user);
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  async signIn(credentialsDto: CredentialsDto) {
    const user = await this.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos');
    }

    const { userId, fullName, email } = user;

    const firstName = this.getFirstName(fullName);

    const jwtPayload = {
      userId,
      firstName,
      email,
    };

    const token = this.jwtService.sign(jwtPayload);
    return token;
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
