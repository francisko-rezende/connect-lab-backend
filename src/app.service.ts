import { devices } from './seeds/device-seeds';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DeviceEntity } from './entities/device.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
    @Inject('DEVICE_REPOSITORY')
    private readonly deviceRepository: Repository<DeviceEntity>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const newUser = this.userRepository.create(createUserDto);
        const user: UserEntity = await this.userRepository.save(newUser);
        resolve(user);
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  populateDb() {
    return new Promise(async (resolve, reject) => {
      try {
        const dbDevices = await this.deviceRepository.find();

        if (dbDevices.length === devices.length) {
          resolve('Default devices are already in the database');
          return;
        }

        const createdDevices = this.deviceRepository.create(devices);
        await this.deviceRepository.save(createdDevices);
        resolve('Default devices added to the database');
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }
}
