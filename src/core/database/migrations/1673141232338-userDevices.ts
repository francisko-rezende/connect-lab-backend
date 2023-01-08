import { MigrationInterface, QueryRunner } from "typeorm";

export class userDevices1673141232338 implements MigrationInterface {
    name = 'userDevices1673141232338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_devices" ("userDeviceId" SERIAL NOT NULL, "isOn" boolean NOT NULL DEFAULT true, "user_id" integer, "device_id" integer, CONSTRAINT "PK_66ec374db974c16703d46904482" PRIMARY KEY ("userDeviceId"))`);
        await queryRunner.query(`ALTER TABLE "user_devices" ADD CONSTRAINT "FK_28bd79e1b3f7c1168f0904ce241" FOREIGN KEY ("user_id") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_devices" ADD CONSTRAINT "FK_7c0755b2e06094d9dfb353a3772" FOREIGN KEY ("device_id") REFERENCES "devices"("deviceId") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_devices" DROP CONSTRAINT "FK_7c0755b2e06094d9dfb353a3772"`);
        await queryRunner.query(`ALTER TABLE "user_devices" DROP CONSTRAINT "FK_28bd79e1b3f7c1168f0904ce241"`);
        await queryRunner.query(`DROP TABLE "user_devices"`);
    }

}
