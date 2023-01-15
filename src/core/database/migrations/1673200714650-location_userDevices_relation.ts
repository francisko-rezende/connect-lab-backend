import { MigrationInterface, QueryRunner } from "typeorm";

export class locationUserDevicesRelation1673200714650 implements MigrationInterface {
    name = 'locationUserDevicesRelation1673200714650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "locations" ("locationId" SERIAL NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_e7122a1a349c83acc7286028df7" PRIMARY KEY ("locationId"))`);
        await queryRunner.query(`ALTER TABLE "user_devices" ADD "location_id" integer`);
        await queryRunner.query(`ALTER TABLE "user_devices" ADD CONSTRAINT "FK_34fe9059c52c90b17a63c410e9e" FOREIGN KEY ("location_id") REFERENCES "locations"("locationId") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_devices" DROP CONSTRAINT "FK_34fe9059c52c90b17a63c410e9e"`);
        await queryRunner.query(`ALTER TABLE "user_devices" DROP COLUMN "location_id"`);
        await queryRunner.query(`DROP TABLE "locations"`);
    }

}
