import { MigrationInterface, QueryRunner } from "typeorm";

export class userHashPassword1672521300207 implements MigrationInterface {
    name = 'userHashPassword1672521300207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "confirmPassword" TO "salt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "salt" TO "confirmPassword"`);
    }

}
