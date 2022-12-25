import { MigrationInterface, QueryRunner } from "typeorm";

export class adresses1671965402447 implements MigrationInterface {
    name = 'adresses1671965402447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("addressId" integer NOT NULL, "zipCode" character varying NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "neighborhood" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "complement" character varying, CONSTRAINT "PK_ff59275f5928941ce06f1d8890c" PRIMARY KEY ("addressId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
