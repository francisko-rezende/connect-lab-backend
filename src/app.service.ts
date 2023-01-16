import { DeviceEntity } from 'src/entities/device.entity';
import { PopulateDbSuccessfulResponseDto } from './dto/populate-db-successful.response.dto';
import { FindOneUserResponseDto } from './dto/find-one-user-response.dto';
import { LocationQueryDto } from './dto/location-query.dto';
// import { FindUserDevicesResponseDto } from './dto/find-user-devices-response.dto';
import { JwtPayloadUser } from 'src/utils/jwt-payload-user';
import { UserEntity } from 'src/entities/user.entity';
import { UserDeviceEntity } from './entities/user-device.entity';
import { devices } from './seeds/device-seeds';
import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
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

  populateDb(): Promise<PopulateDbSuccessfulResponseDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const dbDevices = await this.deviceRepository.find();
        const dbLocations = await this.locationRepository.find();

        if (
          dbDevices.length === devices.length &&
          dbLocations.length === locations.length
        ) {
          resolve({
            message:
              'Default devices and locations are already in the database',
            statusCode: HttpStatus.OK,
          });
          return;
        }

        const createdDevices = this.deviceRepository.create(devices);
        await this.deviceRepository.save(createdDevices);

        const createdLocations = this.locationRepository.create(locations);
        await this.locationRepository.save(createdLocations);
        resolve({
          message: 'Default devices and locations added to the database',
          statusCode: HttpStatus.CREATED,
        });
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  linkDevice(jwtPayloadUser: JwtPayloadUser, linkDeviceDto: LinkDeviceDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const { userId } = jwtPayloadUser;
        const { device: deviceId, local: locationId, room } = linkDeviceDto;
        const user = await this.userRepository.findOne({
          where: { userId: userId },
        });

        const device = await this.deviceRepository.findOne({
          where: { deviceId: deviceId },
        });

        if (!device) {
          reject('Device not found');
          return;
        }

        const location = await this.locationRepository.findOne({
          where: { locationId: locationId },
        });

        if (!location) {
          reject('Location not found');
          return;
        }

        const newUserDevice = this.userDeviceRepository.create({
          user,
          device,
          room,
          location,
        });
        await this.userDeviceRepository.save(newUserDevice);
        const result = {
          user: userId,
          device: device.deviceId,
          local: location.locationId,
          is_on: newUserDevice.isOn,
          room: newUserDevice.room,
          _id: newUserDevice.userDeviceId,
        };

        resolve(result);
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  findAllUserDevices(
    userPayload: JwtPayloadUser,
    locationQuery?: LocationQueryDto,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const { userId } = userPayload;
        const { local } = locationQuery;

        const userDevicesResult = await this.userDeviceRepository.find({
          where: {
            user: { userId: userId },
            location: { description: local },
          },
          relations: {
            device: { deviceInfo: true },
            user: true,
            location: true,
          },
          // select: {
          //   userDeviceId: true,
          //   isOn: true,
          //   device: {
          //     name: true,
          //     type: true,
          //     madeBy: true,
          //   },
          // },
        });

        if (!userDevicesResult) {
          resolve([]);
          return;
        }

        const linkedUserDevicesDto = userDevicesResult.map(
          this.reshapeToFindUserDeviceDto,
        );

        resolve(linkedUserDevicesDto);
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  findOneUserDevice(userDeviceId: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const userDevice = await this.userDeviceRepository.findOne({
          where: { userDeviceId: userDeviceId },
          relations: {
            device: { deviceInfo: true },
            user: true,
            location: true,
          },
          // select: {
          //   userDeviceId: true,
          //   isOn: true,
          //   device: {
          //     name: true,
          //     type: true,
          //     madeBy: true,
          //   },
          // },
        });

        if (!userDevice) {
          reject('Device not found');
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

  findAllDevices() {
    return new Promise(async (resolve, reject) => {
      try {
        const devices: DeviceEntity[] = await this.deviceRepository.find({
          relations: { deviceInfo: true },
        });
        const mappedDevices = devices.map(
          ({ deviceId, name, type, madeBy, photoUrl, deviceInfo }) => ({
            info: deviceInfo,
            _id: deviceId,
            name,
            type,
            madeBy,
            photoUrl,
          }),
        );
        resolve(mappedDevices);
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  toggleDeviceStatus(body, userDeviceId: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const userDevice = await this.userDeviceRepository.findOne({
          where: { userDeviceId: userDeviceId },
        });
        userDevice.isOn = body.is_on;
        await this.userDeviceRepository.save(userDevice);
        resolve({
          statusCode: HttpStatus.OK,
          message: 'Device status updated',
        });
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  deleteUserDevice(userDeviceId: number) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.userDeviceRepository.delete({ userDeviceId: userDeviceId });
        resolve({
          statusCode: HttpStatus.OK,
          message: 'Device status updated',
        });
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }

  async findAllLocals() {
    return await this.locationRepository.find();
  }

  reshapeToFindUserDeviceDto(userDevice: UserDeviceEntity) {
    const {
      // user: { userId },
      userDeviceId,
      device: { name, type, madeBy, deviceInfo, deviceId, photoUrl },
      isOn,
      room,
      location,
    } = userDevice;

    return {
      _id: userDeviceId,
      user: userDevice.user.userId,
      device: {
        info: deviceInfo,
        _id: deviceId,
        name,
        type,
        madeBy,
        photoUrl,
      },
      local: location,
      is_on: isOn,
      room,
    };
  }
}
