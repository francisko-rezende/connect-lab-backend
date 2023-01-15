import { MigrationInterface, QueryRunner } from "typeorm";

export class userDevicesDefaultStatusFalse1673199316343 implements MigrationInterface {
    name = 'userDevicesDefaultStatusFalse1673199316343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_devices" ALTER COLUMN "isOn" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_devices" ALTER COLUMN "isOn" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_devices" ALTER COLUMN "isOn" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user_devices" ALTER COLUMN "isOn" SET DEFAULT true`);
    }

}
