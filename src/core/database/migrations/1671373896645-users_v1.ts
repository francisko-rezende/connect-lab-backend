import { MigrationInterface, QueryRunner } from "typeorm";

export class usersV11671373896645 implements MigrationInterface {
    name = 'usersV11671373896645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("userId" SERIAL NOT NULL, "fullName" character varying NOT NULL, "photoUrl" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "confirmPassword" character varying NOT NULL, "phone" character varying, CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
