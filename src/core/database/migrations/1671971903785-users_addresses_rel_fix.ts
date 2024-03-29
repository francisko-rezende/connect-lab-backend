import { MigrationInterface, QueryRunner } from "typeorm";

export class usersAddressesRelFix1671971903785 implements MigrationInterface {
    name = 'usersAddressesRelFix1671971903785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "UQ_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "UQ_95c93a584de49f0b0e13f753630" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
