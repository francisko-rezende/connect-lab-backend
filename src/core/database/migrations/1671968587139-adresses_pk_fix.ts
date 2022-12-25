import { MigrationInterface, QueryRunner } from "typeorm";

export class adressesPkFix1671968587139 implements MigrationInterface {
    name = 'adressesPkFix1671968587139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "addresses_addressId_seq" OWNED BY "addresses"."addressId"`);
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "addressId" SET DEFAULT nextval('"addresses_addressId_seq"')`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "addresses_addressId_seq" OWNED BY "addresses"."addressId"`);
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "addressId" SET DEFAULT nextval('"addresses_addressId_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "addressId" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "addresses_addressId_seq"`);
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "addressId" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "addresses_addressId_seq"`);
    }

}
