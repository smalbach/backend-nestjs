import {MigrationInterface, QueryRunner} from "typeorm";

export class uniquekey1680983186521 implements MigrationInterface {
    name = 'uniquekey1680983186521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "UQ_ed61d4dcafb6fe0f595f5e0cbd0" UNIQUE ("nit")`);
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "nit" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "nit" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "UQ_ed61d4dcafb6fe0f595f5e0cbd0"`);
    }

}
