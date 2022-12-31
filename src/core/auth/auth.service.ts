import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
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

  private hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
