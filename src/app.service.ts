import { UserEntity } from 'src/entities/user.entity';
import { UserDeviceEntity } from './entities/userDevice.entity';
import { devices } from './seeds/device-seeds';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DeviceEntity } from './entities/device.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject('DEVICE_REPOSITORY')
    private readonly deviceRepository: Repository<DeviceEntity>,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
    @Inject('USER_DEVICE_REPOSITORY')
    private readonly userDeviceRepository: Repository<UserDeviceEntity>,
  ) {}

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

  linkDevice(userId: number, deviceId: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.findOne({
          where: { userId: userId },
        });

        const device = await this.deviceRepository.findOne({
          where: { deviceId: deviceId },
        });

        const newUserDevice = this.userDeviceRepository.create({
          user,
          device,
        });
        await this.userDeviceRepository.save(newUserDevice);
        console.log(newUserDevice);
        resolve(newUserDevice);
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  findAllUserDevices(userId: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.findOne({
          where: { userId: userId },
          relations: { userDevices: { device: { deviceInfo: true } } },
        });

        const userDevices = user.userDevices.map(
          ({ device: { name, type, madeBy, deviceInfo }, isOn }) => ({
            name,
            type,
            madeBy,
            isOn,
            deviceInfo,
          }),
        );

        resolve(userDevices);
      } catch (error) {
        console.log(error);
        reject({ detail: error.detail, code: error.code });
      }
    });
  }
}
