import { MigrationInterface, QueryRunner } from "typeorm";

export class relationDeviceInfoDevice1672493893846 implements MigrationInterface {
    name = 'relationDeviceInfoDevice1672493893846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "device_info" ("deviceInfoId" SERIAL NOT NULL, "virtual_id" character varying NOT NULL, "ip_address" character varying NOT NULL, "mac_address" character varying NOT NULL, "signal" character varying NOT NULL, CONSTRAINT "PK_1c61b684253de47a1ee82c17739" PRIMARY KEY ("deviceInfoId"))`);
        await queryRunner.query(`ALTER TABLE "devices" ADD "deviceInfoId" integer`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "UQ_20255a4b93c37c347acc4722533" UNIQUE ("deviceInfoId")`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_20255a4b93c37c347acc4722533" FOREIGN KEY ("deviceInfoId") REFERENCES "device_info"("deviceInfoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_20255a4b93c37c347acc4722533"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "UQ_20255a4b93c37c347acc4722533"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "deviceInfoId"`);
        await queryRunner.query(`DROP TABLE "device_info"`);
    }

}
