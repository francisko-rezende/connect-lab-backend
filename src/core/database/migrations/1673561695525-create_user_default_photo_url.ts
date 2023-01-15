import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserDefaultPhotoUrl1673561695525 implements MigrationInterface {
    name = 'createUserDefaultPhotoUrl1673561695525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "photoUrl" SET DEFAULT 'https://res.cloudinary.com/dqd4u48y1/image/upload/v1673561527/llama_xx3coq.webp'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "photoUrl" SET DEFAULT 'https://res.cloudinary.com/dqd4u48y1/image/upload/v1673561527/llama_xx3coq.webp'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "photoUrl" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "photoUrl" DROP DEFAULT`);
    }

}
