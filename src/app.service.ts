import { FindOneUserResponseDto } from './dto/find-one-user-response.dto';
import { LocationQueryDto } from './dto/location-query.dto';
import { FindUserDevicesResponseDto } from './dto/find-user-devices-response.dto';
import { JwtPayloadUser } from 'src/utils/jwt-payload-user';
import { UserEntity } from 'src/entities/user.entity';
import { UserDeviceEntity } from './entities/user-device.entity';
import { devices } from './seeds/device-seeds';
import { Inject, Injectable } from '@nestjs/common';
import { FindOperator, ILike, Repository } from 'typeorm';
import { DeviceEntity } from './entities/device.entity';
import { LocationEntity } from './entities/location.entity';
import { locations } from './seeds/location-seeds';
import { LinkDeviceDto } from './dto/link-device.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('DEVICE_REPOSITORY')
    private readonly deviceRepository: Repository<DeviceEntity>,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
    @Inject('USER_DEVICE_REPOSITORY')
    private readonly userDeviceRepository: Repository<UserDeviceEntity>,
    @Inject('LOCATION_REPOSITORY')
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}

  populateDb() {
    return new Promise(async (resolve, reject) => {
      try {
        const dbDevices = await this.deviceRepository.find();
        const dbLocations = await this.locationRepository.find();

        if (
          dbDevices.length === devices.length &&
          dbLocations.length === locations.length
        ) {
          resolve('Default devices and locations are already in the database');
          return;
        }

        const createdDevices = this.deviceRepository.create(devices);
        await this.deviceRepository.save(createdDevices);

        const createdLocations = this.locationRepository.create(locations);
        await this.locationRepository.save(createdLocations);
        resolve('Default devices and locations added to the database');
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  linkDevice(jwtPayloadUser: JwtPayloadUser, linkDeviceDto: LinkDeviceDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const { userId } = jwtPayloadUser;
        const { deviceId, locationId, room } = linkDeviceDto;
        const user = await this.userRepository.findOne({
          where: { userId: userId },
        });

        const device = await this.deviceRepository.findOne({
          where: { deviceId: deviceId },
        });

        if (!device) {
          reject('Dispositivo não encontrado');
          return;
        }

        const location = await this.locationRepository.findOne({
          where: { locationId: locationId },
        });

        if (!location) {
          reject('Local não encontrado');
          return;
        }

        const newUserDevice = this.userDeviceRepository.create({
          user,
          device,
          room,
          location,
        });
        await this.userDeviceRepository.save(newUserDevice);

        resolve('Dispositivo vinculado com sucesso');
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  findAllUserDevices(
    userPayload: JwtPayloadUser,
    locationQuery?: LocationQueryDto,
  ): Promise<FindUserDevicesResponseDto[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { userId } = userPayload;
        const { local } = locationQuery;

        let where: {
          userDevices?: { location: { description: FindOperator<string> } };
          userId: number;
        } = { userId: userId };

        if (local) {
          where = {
            ...where,
            userDevices: {
              location: { description: ILike(`%${local}%`) },
            },
          };
        }
        const userDevices = await this.userRepository.findOne({
          where,
          relations: {
            userDevices: {
              device: { deviceInfo: true },
              location: true,
            },
          },
        });

        if (!userDevices) {
          resolve([]);
          return;
        }

        const linkedUserDevicesDto: FindUserDevicesResponseDto[] =
          userDevices.userDevices.map(this.reshapeToFindUserDeviceDto);

        resolve(linkedUserDevicesDto);
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  findOneUserDevice(userDeviceId: number): Promise<FindUserDevicesResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const userDevice = await this.userDeviceRepository.findOne({
          where: { userDeviceId: userDeviceId },
          relations: { device: { deviceInfo: true } },
          select: {
            userDeviceId: true,
            isOn: true,
            device: {
              name: true,
              type: true,
              madeBy: true,
            },
          },
        });

        if (!userDevice) {
          reject('Dispositivo não encontrado');
        }

        resolve(this.reshapeToFindUserDeviceDto(userDevice));
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  findOneUser(jwtPayloadUser: JwtPayloadUser): Promise<FindOneUserResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const { userId } = jwtPayloadUser;
        const user = await this.userRepository.findOne({
          where: { userId: userId },
          relations: { address: true },
          select: {
            userId: true,
            fullName: true,
            photoUrl: true,
            email: true,
            phone: true,
          },
        });

        if (!user.phone) {
          delete user.phone;
        }

        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }

  reshapeToFindUserDeviceDto(
    userDevice: UserDeviceEntity,
  ): FindUserDevicesResponseDto {
    const {
      userDeviceId,
      device: { name, type, madeBy, deviceInfo },
      isOn,
      room,
    } = userDevice;

    return {
      userDeviceId,
      name,
      type,
      madeBy,
      isOn,
      room,
      deviceInfo,
    };
  }
}
