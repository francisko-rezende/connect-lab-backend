import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const newUser = this.userRepository.create(createUserDto);
        await this.userRepository.save(newUser);
        resolve(newUser);
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
