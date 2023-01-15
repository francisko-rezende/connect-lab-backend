import { MigrationInterface, QueryRunner } from "typeorm";

export class userDeviceRoomProp1673202178025 implements MigrationInterface {
    name = 'userDeviceRoomProp1673202178025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_devices" ADD "room" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_devices" DROP COLUMN "room"`);
    }

}
