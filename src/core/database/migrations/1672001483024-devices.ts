import { MigrationInterface, QueryRunner } from "typeorm";

export class devices1672001483024 implements MigrationInterface {
    name = 'devices1672001483024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "devices" ("deviceId" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "madeBy" character varying NOT NULL, "photoUrl" character varying NOT NULL, CONSTRAINT "PK_666c9b59efda8ca85b29157152c" PRIMARY KEY ("deviceId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "devices"`);
    }

}
